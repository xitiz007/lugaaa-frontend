import Head from "next/head";
import { DataContext } from "../store/globalState";
import { useState, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { validateUpdateProfile } from "../utils/verifyCredential";
import { updateProfile } from "../utils/crud";
import { NOTIFY } from "../store/constants";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import axios from "../utils/axios";
import Cookie from "js-cookie";
import {parseCookies} from "nookies";
import Link from "next/link";

function profile({user, orders}) {
  const { state, dispatch } = useContext(DataContext);
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [code, setCode] = useState(user.number.code.toString());
  const [phoneNumber, setPhoneNumber] = useState(user.number.phoneNumber.toString());

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch({ type: NOTIFY, payload: { loading: true } });

    try {
      validateUpdateProfile(
        changePassword,
        fname,
        lname,
        code,
        phoneNumber,
        currentPassword,
        newPassword,
        confirmNewPassword
      );
    } catch (err) {
      return dispatch({ type: NOTIFY, payload: { error: err.message } });
    }
    const bodyData = {
      changePassword,
      fname,
      lname,
      code,
      phoneNumber,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };
    const {error, message} = await updateProfile(bodyData, Cookie.get('accessToken'));
    if (error) 
    {
      return dispatch({ type: NOTIFY, payload: { error: message } });
    }
    setChangePassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    return dispatch({ type: NOTIFY, payload: { success: message } });
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
      <Head>
        <title>{user ? user.fname + " " + user.lname : "Profile"}</title>
      </Head>
      <section className="grid grid-cols-3 gap-2">
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-col space-y-4 bg-white p-3 rounded-md shadow-sm">
            <h2 className="text-xl font-medium tracking-wide">
              {user && user.role === "admin" ? "Admin Profile" : "User Profile"}
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
                    required
                    value={fname}
                    onChange={(event) => setFname(event.target.value)}
                    className="input-box"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
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
                    required
                    value={lname}
                    onChange={(event) => setLname(event.target.value)}
                    className="input-box"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
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
                  autoFocus
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
                  value={phoneNumber}
                  id="number"
                  containerClassName="intl-tel-input"
                  inputClassName="input-box"
                  defaultCountry={
                    user && user.number.code === 977 ? "np" : "au"
                  }
                  preferredCountries={[]}
                  onlyCountries={["np", "au"]}
                  customPlaceholder={(num, country) => {
                    setCode(country.dialCode);
                  }}
                  onPhoneNumberChange={(b, n, c, number) => {
                    setPhoneNumber(n);
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={changePassword}
                  onChange={() => setChangePassword(!changePassword)}
                  id="changePassword"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  htmlFor="changePassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Change Password
                </label>
              </div>
              {changePassword && (
                <>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="currentPassword"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Current Password
                      </label>
                    </div>
                    <input
                      required
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                      type="password"
                      id="currentPassword"
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                    </div>
                    <input
                      required
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      type="password"
                      id="newPassword"
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confirmNewPassword"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Confirm New Password
                      </label>
                    </div>
                    <input
                      required
                      value={confirmNewPassword}
                      onChange={(event) =>
                        setConfirmNewPassword(event.target.value)
                      }
                      type="password"
                      id="confirmNewPassword"
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                </>
              )}

              <div>
                <button
                  disabled={state.notify.loading || false}
                  type="submit"
                  className="w-full tracking-widest px-4 py-2 text-lg font-medium text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  {state.notify.loading ? <CircularProgress /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="orders">
              <h2>Total Orders</h2>
              <h6>{orders.totalOrder}</h6>
            </div>
            <div className="orders">
              <h2>Total Orders Received</h2>
              <h6>{orders.totalReceived}</h6>
            </div>
            <div className="orders">
              <h2>Total Orders Paid</h2>
              <h6>{orders.totalPaid}</h6>
            </div>
            <div className="orders">
              <h2>Total Orders Unpaid</h2>
              <h6>{orders.totalUnPaid}</h6>
            </div>
          </div>
          <Link href="/orders">
            <a className="text-base font-normal tracking-wide text-blue-500 underline">view all orders</a>
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context)
{
  let orders = {};
  const {accessToken} = parseCookies(context);
  try
  {
    const response = await axios.get("/users/orderCount", {
      headers: {
        Authorization: accessToken,
      },
    });
    orders = response.data;
  }
  catch(err)
  {
    console.log(err);
  }
  return {
    props: {
      orders
    }
  }
}

export default profile;
