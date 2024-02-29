"use server";
// NextJS
import { redirect } from "next/navigation";
// Supabase
import { createClient } from "../../utils/supabase/server";

export const checkUser = async () => {
  // Initialise supabase client
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  // Auth check
  if (data.user) {
    // Redirect user to the dashboard if they are signed in
    redirect("/dashboard");
  }
};

export const getUserName = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return data.user.user_metadata.name;
};

export const logout = async () => {
  // Initialise supabase client
  const supabase = createClient();
  // Logout
  const res = await supabase.auth.signOut();
  console.log(res);
};
