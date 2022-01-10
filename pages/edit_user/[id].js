import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { DataContext } from "../../store/globalState";
import Head from "next/head";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { NOTIFY } from "../../store/constants";
import { updateRole } from "../../utils/crud";
import CircularProgress from "@material-ui/core/CircularProgress";
import {parseCookies} from "nookies";
import axios from "../../utils/axios";
import Cookies from "js-cookie";
import Error from "next/error";

function EditUser({userData}) {
    if (!userData) {
      return <Error statusCode={404} />;
    }
    const [user, setUser] = useState(userData);
    const [isAdmin, setIsAdmin] = useState(userData.role === 'admin' || false);
    const {state, dispatch} = useContext(DataContext);
    const router = useRouter();

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        dispatch({ type: NOTIFY, payload: { loading: true } });
        const role = isAdmin ? "admin" : "user";

        const {error, message} = await updateRole(
          user._id,
          { role },
          Cookies.get('accessToken')
        );
        if(error) return dispatch({ type: NOTIFY, payload: { error: message } });
        return dispatch({ type: NOTIFY, payload: { success: message } });
    }


    return (
      <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
        <Head>
          <title>Edit User</title>
        </Head>
        <button
          className="bg-gray-800 hover:bg-gray-900 ease-out text-white rounded-md px-4 py-2 text-sm tracking-wide"
          onClick={() => router.back()}
        >
          go back
        </button>
        <div className="flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="font-medium text-base md:text-lg lg:text-xl tracking-widest text-center mb-2">
              EDIT USER
            </h2>

            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col space-y-5"
            >
              <div className="md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-700"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    value={user.firstName}
                    className="input-box"
                    id="firstName"
                    type="text"
                    disabled={true}
                  />
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    disabled={true}
                    value={user.lastName}
                    className="input-box"
                    id="lastName"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  value={user.email}
                  disabled={true}
                  type="email"
                  id="email"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700"
                  htmlFor="number"
                >
                  Phone Number
                </label>
                <IntlTelInput
                disabled={true}
                  value={user.number?.phoneNumber.toString()}
                  id="number"
                  containerClassName="intl-tel-input"
                  inputClassName="input-box"
                  defaultCountry={"np"}
                  preferredCountries={[]}
                  onlyCountries={["np", "au"]}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                  id="isAdmin"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  htmlFor="isAdmin"
                  className="text-sm font-medium text-gray-700"
                >
                  Is Admin
                </label>
              </div>

              <div>
                <button
                  disabled={state.notify.loading || false}
                  type="submit"
                  className="w-full tracking-widest px-4 py-2 text-lg font-medium text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  {
                    state.notify.loading ? <CircularProgress /> : "Update"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export async function getServerSideProps(context){
  const {accessToken} = parseCookies(context);
  const {id} = context.query;
  let userData= null;
  try
  {
    const response = await axios.get(`/users/${id}`, {
      headers: {
        Authorization: accessToken,
      }
    })
    userData = response.data.user;
  }
  catch(err)
  {
    console.log(err);
  }
  return {
    props: {
      userData,
    },
  };
}

export default EditUser
