"use server";
// NextJS
import { revalidatePath } from "next/cache";
// Supabase
import { createClient } from "../../utils/supabase/server";

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

export const createEntry = async (props) => {
  const supabase = createClient();
  const uid = await getUID();
  const { data, error } = await supabase.from("entry").insert([
    {
      name: props.name,
      time: props.time,
      project_id: props.project,
    },
  ]);
  console.log(data, error);
  return data;
};

export const getEntries = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("entry")
    .select()
    .order("created_at", { ascending: false });
  return data;
};

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
  console.log(data);
  return data;
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
