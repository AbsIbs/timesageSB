import { logout } from "@/logic/authLogic";

const Entries = async ({}) => {
  return(
    <div>
      <p>successfully logged in!</p>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </div>
  )
};

export default Entries;