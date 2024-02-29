"use server";
import { createClient } from "../../utils/supabase/server";
// NextJS
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signInClean = async () => {
  const supabase = createClient();
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  console.log(res);
  revalidatePath("/", "layout");
  redirect("/");
};
