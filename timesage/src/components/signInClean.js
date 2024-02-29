"use server";
import { createClient } from "../../utils/supabase/server";
// NextJS
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signInClean = async () => {
  const supabase = createClient();
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/signIn/",
    },
  });
  console.log(res);
  revalidatePath("/", "layout");
  redirect("/");
};
