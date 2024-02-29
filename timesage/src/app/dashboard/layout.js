// NextJS
import { redirect } from "next/navigation";
// Supabase
import { createClient } from "../../../utils/supabase/server";
// Components
import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";
import StopwatchDisplay from "@/components/stopwatchDisplay";
import StopwatchModal from "@/components/stopwatchModal";

export const metadata = {
  title: "Timesage",
  description: "Manage your time",
};

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className=" m-0 p-0 flex items-start">
      <Sidebar />
      <StopwatchModal />
      <div className="flex flex-col flex-1">
        <Topbar />
        <StopwatchDisplay />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
