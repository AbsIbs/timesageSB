"use server";
// NextJS
import { redirect } from "next/navigation";
// Supabase
import { createClient } from "../../utils/supabase/server";

export const insertEntry = async (props) => {
  const supabase = createClient();
  const uid = await getUID();
  const { data, error } = await supabase.from("entry").insert([
    {
      name: props.name,
      time: props.time,
      project_id: props.project
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
