// Supabase
import { getUserName } from "@/logic/authLogic";

const GetUsername = async () => {
  const data = await getUserName();
  const name = data.split(" ")[0].toUpperCase();
  return (
    <div className="font-bold py-2 px-4 border-2 border-line rounded-full">
      {name[0]}
    </div>
  );
};

export default GetUsername;
