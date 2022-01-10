import Head from "next/head";
import UserTable from "../components/UserTable";
import { getUsers } from "../utils/crud";
import { parseCookies } from "nookies";
import {useState} from "react";

function Users({ users, user }) 
{
    const [clients, setClients] = useState(users);
    return (
      <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
        <Head>
          <title>Users</title>
        </Head>
        <h2 className="text-base md:text-lg lg:text-xl font-medium tracking-widest my-2">
          USERS
        </h2>
        <UserTable userId={user.id} users={clients} setUsers={setClients} />
      </div>
    );
}

export async function getServerSideProps(context)
{
  const { accessToken } = parseCookies(context);
  const users = await getUsers(accessToken);
  return {
    props: {
      users
    }
  }
}

export default Users
