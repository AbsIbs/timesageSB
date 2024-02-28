// NextJS
import { redirect } from "next/navigation";
import { headers } from "next/headers";
// Components
/* import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";
import StopwatchDisplay from "@/components/stopwatchDisplay";
import StopwatchModal from "@/components/stopwatchModal"; */

export const metadata = {
  title: "Timesage",
  description: "Manage your time",
};

export default async function DashboardLayout({ children }) {

/*   try {
    const user = await Auth.currentAuthenticatedUser();
  } catch (error) {
    console.log(error);
    redirect("/");
  }
 */
  return (
    <div className=" m-0 p-0 flex items-start">
      <main className="flex-1">{children}</main>
    </div>
  );
}
