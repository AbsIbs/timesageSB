"use server";
// NextJS
import { revalidatePath } from "next/cache";
// Supabase
import { createClient } from "../../utils/supabase/server";

// TIMESTAMP VALIDATION
const datetimeToTimestamp = (datetimeString) => {
  try {
    // Parse the date-time string
    const dateObj = new Date(datetimeString);

    // Format the date components
    const year = String(dateObj.getFullYear()).padStart(4, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");
    const milliseconds = String(dateObj.getMilliseconds()).padStart(3, "0");

    // Construct the formatted date-time string in Supabase timestamp format
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    return formattedDateTime;
  } catch (error) {
    console.error("Error converting date-time:", error);
    return null; // Or return a default value if conversion fails
  }
};

// INPUT VALIDATION
const nameRegex = /^.{1,30}$/;
const descRegex = /^.{1,100}$/;
const hoursRegex = /^[0-9]|[1-9][0-9]$/;
const minutesSecondsRegex = /^[0-5][0-9]$/;

const validate = (input, pattern, type) => {
  if (typeof input === type && pattern.test(input)) {
    // Valid input
    return true;
  } else {
    // Invalid input
    return false;
  }
};

const validateTime = (input, pattern, errorMessage) => {
  try {
    const tempValue = input === "" ? 0 : Number(input);
    console.log(tempValue);
    if (!validate(tempValue, pattern, "number")) {
      return { type: errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { type: errorMessage };
  }
};

const calculateTime = (props) => {
  return (
    props.hours * 60 * 60 * 1000 +
    props.minutes * 60 * 1000 +
    props.seconds * 1000
  );
};

// PROJECTS
export const getProjects = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .order("created_at", { ascending: false });
  return data;
};

export const getProject = async (id) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("project").select().eq("id", id);
  if (data) {
    return data[0];
  } else {
    console.log(error);
  }
};

export const createProject = async (formData) => {
  // Validate the form data
  const result = {
    name: validate(formData.name, nameRegex, "string"),
    desc: validate(formData.desc, descRegex, "string"),
  };
  console.log(result);
  if (!result.name || !result.desc || !formData.icon) {
    // If at least one of the attributes fails the regex test
    return { type: "error", name: !result.name, desc: !result.desc };
  }
  const supabase = createClient();
  // Check to see if user has no more than 5 projects
  const projects = await getProjects();
  if (projects.length >= 5) {
    return { type: "limitError" };
  }
  const { data, error } = await supabase.from("project").insert([
    {
      name: formData.name,
      icon: formData.icon,
      desc: formData.desc,
    },
  ]);
  if (!error) {
    revalidatePath("/dashboard/projects");
    return { type: "success" };
  } else {
    console.log(error);
  }
};

export const updateProject = async (props) => {
  // Validate icons
  const iconsArray = ["work", "school", "libraryBooks", "code", "event"];
  if (!iconsArray.includes(props.icon)) {
    return { type: "iconError" };
  }
  // Validate project name
  if (!validate(props.name, nameRegex, "string")) {
    return { type: "nameError" };
  }
  // Validate the form description
  if (!validate(props.desc, descRegex, "string")) {
    return { type: "descError" };
  }
  const supabase = createClient();
  // Create a new object without the 'id' property
  const updatedFormData = { ...props }; // Create a shallow copy
  // Remove ID, Hours, Minutes and seconds key-pair values
  delete updatedFormData.id;
  // Upload to supabase
  const { error } = await supabase
    .from("project")
    .update(updatedFormData)
    .eq("id", props.id);
  if (error) {
    console.log({ error: `there was an error! ${error}` });
    return { type: "unknownError" };
  } else {
    console.log("it updated");
    revalidatePath(`/dashboard/projects/${props.id}`);
    return { type: "success" };
  }
};

export const deleteProject = async (id) => {
  const supabase = createClient();
  const { error } = await supabase.from("project").delete().eq("id", id);
  if (!error) {
    revalidatePath("/dashboard/projects");
    return { type: "success" };
  } else {
    console.log(error);
  }
};

// ENTRIES
export const createEntry = async (formData) => {
  // VALIDATE TIME
  // Validate Hours
  validateTime(formData.hours, hoursRegex, "hoursError");
  // Validate minutes
  validateTime(formData.minutes, minutesSecondsRegex, "minutesError");
  // Validate hours
  validateTime(formData.seconds, minutesSecondsRegex, "secondsError");

  // Calculate total time
  const time = calculateTime(formData);
  if (time === 0) {
    return { type: "totalTimeError" };
  }

  // Validate Project ID
  const project = await getProject(formData.project_id);
  if (!project) {
    return { type: "projectError" };
  }
  // Validate the form description
  if (!validate(formData.desc, descRegex, "string")) {
    return { type: "descError" };
  }

  const supabase = createClient();
  const dataToInsert = {
    time: time,
    desc: formData.desc,
    project_id: formData.project_id,
  };

  if (formData.started_at) {
    dataToInsert.started_at = formData.started_at;
  }

  const { data, error } = await supabase.from("entry").insert(dataToInsert);

  if (error) {
    console.log(error);
    return { type: "unknownError" };
  } else {
    console.log(data);
    revalidatePath("/dashboard/projects");
    return { type: "success" };
  }
};

export const getTotalEntries = async (id) => {
  const supabase = createClient();
  if (id) {
    const { count, error } = await supabase
      .from("entry")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id);
    return count;
  } else {
    const { count, error } = await supabase
      .from("entry")
      .select("*", { count: "exact", head: true });
    return count;
  }
};

export const getProjectEntries = async (props) => {
  const supabase = createClient();
  // Offset calculation
  const from = Number(props.page - 1) * Number(props.perPage);
  const to = from + Number(props.perPage - 1);
  console.log({ from: from, to: to });
  const { data, error } = await supabase
    .from("entry")
    .select(
      `*, project (
      name
    )`
    )
    .eq("project_id", props.id)
    .range(from, to)
    .order("started_at", { ascending: false });
  return data;
};

export const getEntries = async (props) => {
  const supabase = createClient();
  // Offset calculation
  const from = Number(props.page - 1) * Number(props.perPage);
  const to = from + Number(props.perPage - 1);
  /* We inner join the project name using the id of the project on the entry */
  const { data, error } = await supabase
    .from("entry")
    .select(
      `*, project (
      name
    )`
    )
    .limit(props.perPage)
    .range(from, to)
    .order("started_at", { ascending: false });
  return data;
};

export const updateEntry = async (props) => {
  // VALIDATE TIME
  // Validate Hours
  validateTime(props.hours, hoursRegex, "hoursError");
  // Validate minutes
  validateTime(props.minutes, minutesSecondsRegex, "minutesError");
  // Validate hours
  validateTime(props.seconds, minutesSecondsRegex, "secondsError");

  // Calculate total time
  const time = calculateTime(props);
  if (time === 0) {
    return { type: "totalTimeError" };
  }
  // Validate datetime
  try {
    datetimeToTimestamp(props.started_at);
  } catch (error) {
    console.log(error);
    return { type: "dateTimeError" };
  }

  // Validate description
  // Validate the form description
  if (!validate(props.desc, descRegex, "string")) {
    return { type: "descError" };
  }
  const supabase = createClient();
  // Validate Project ID
  const project = await getProject(props.project_id);
  if (!project) {
    return { type: "projectError" };
  }
  // Create a new object without the 'id' property
  const updatedFormData = { ...props }; // Create a shallow copy
  // Remove ID, Hours, Minutes and seconds key-pair values
  delete updatedFormData.id;
  delete updatedFormData.hours;
  delete updatedFormData.minutes;
  delete updatedFormData.seconds;

  updatedFormData.time = time;
  // Convert datetime of created_at value
  updatedFormData.started_at = datetimeToTimestamp(updatedFormData.started_at);
  // Upload to supabase
  const { error } = await supabase
    .from("entry")
    .update(updatedFormData)
    .eq("id", props.id);
  if (error) {
    console.log(error);
    return { type: "unknownError" };
  } else {
    revalidatePath("/dashboard/entries");
    return { type: "success" };
  }
};

export const deleteEntry = async (id) => {
  const supabase = createClient();
  const { error } = await supabase.from("entry").delete().eq("id", id);
  if (!error) {
    revalidatePath("/dashboard/entries");
    return { type: "success" };
  } else {
    console.log(error);
  }
};
