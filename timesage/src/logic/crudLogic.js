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

// TEXT VALIDATION
// Server side check
const nameRegex = /^.{1,30}$/;
const descRegex = /^.{1,100}$/;

const validate = (input, pattern) => {
  if (typeof input === "string" && pattern.test(input)) {
    // Valid input
    return false;
  } else {
    // Invalid input
    return true;
  }
};

// PROJECTS
export const createProject = async (formData) => {
  // Validate the form data
  const result = {
    name: validate(formData.name, nameRegex),
    desc: validate(formData.desc, descRegex),
  };
  if (result.name || result.desc || !formData.icon) {
    // If at least one of the attributes fails the regex test
    return { type: "error", name: result.name, desc: result.desc };
  }

  const supabase = createClient();
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

export const getProjects = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project")
    .select()
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
  // Validate Project ID
  const project = await getProject(formData.project_id);
  console.log({ project: project });
  if (!project) {
    console.log('error validating project')
    return { type: "projectError" };
  }
  // Validate the form description
  const result = {
    desc: validate(formData.desc, descRegex),
  };
  if (result.desc) {
    return { type: "descError" };
  }

  const supabase = createClient();
  const { data, error } = await supabase.from("entry").insert([
    {
      time: formData.time,
      desc: formData.desc,
      project_id: formData.project_id,
    },
  ]);
  console.log(data, error);

  if (error) {
    return { type: "unknownError" };
  } else {
    revalidatePath("/dashboard/projects");
    return { type: "success" };
  }
};

export const getEntries = async () => {
  const supabase = createClient();
  /* We inner join the project name using the id of the project on the entry */
  const { data, error } = await supabase
    .from("entry")
    .select(
      `*, project (
      name
    )`
    )
    .order("created_at", { ascending: false });
  return data;
};

export const updateEntry = async (props) => {
  const supabase = createClient();
  // Validate datetime
  try {
    datetimeToTimestamp(props.entry_date);
  } catch (error) {
    console.log(error);
    return { type: "dateTimeError" };
  }
  // Validate description
  const descValidation = {
    desc: validate(props.desc, descRegex),
  };
  if (descValidation.desc) {
    return { type: "descError" };
  }
  // Validate Project ID
  const project = await getProject(props.project_id);
  if (!project) {
    console.log("project does not exist");
    return { type: "projectError" };
  }
  // Create a new object without the 'id' property
  const updatedFormData = { ...props }; // Create a shallow copy
  delete updatedFormData.id;
  // Convert datetime of created_at value
  updatedFormData.entry_date = datetimeToTimestamp(updatedFormData.entry_date);
  console.log(updatedFormData);
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