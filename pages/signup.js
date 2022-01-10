import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState, useContext } from "react";
import { DataContext } from "../store/globalState";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { NOTIFY } from "../store/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import { validateForm } from "../utils/verifyCredential";
import axios from "../utils/axios";

function signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [code, setCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { state, dispatch } = useContext(DataContext);

  const emptyStates = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRePassword("");
    setCode(null);
    setPhoneNumber("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      validateForm(
        firstName,
        lastName,
        email,
        phoneNumber,
        code,
        password,
        rePassword
      );
    } catch (err) {
      return dispatch({
        type: NOTIFY,
        payload: { error: err.message },
      });
    }
    dispatch({ type: NOTIFY, payload: { loading: true } });
    const user = {
      fname: firstName,
      lname: lastName,
      email,
      number: phoneNumber,
      code,
      password,
      confirmPassword: rePassword,
    };
    try {
      const response = await axios.post("/auth/register", user);
      dispatch({
        type: NOTIFY,
        payload: { success: response.data.message },
      });
      emptyStates();
    } catch (err) {
      return dispatch({
        type: NOTIFY,
        payload: { error: err.response.data.message },
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="flex justify-center px-3 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className="relative w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
            <Image src="/images/signup.jpg" layout="fill" />
          </div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
            <form
              onSubmit={onSubmitHandler}
              className="px-1 pt-6 pb-8 mb-4 bg-white rounded"
            >
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="input-box"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="input-box"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input-box"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="number"
                >
                  Phone Number
                </label>
                <IntlTelInput
                  value={phoneNumber}
                  id="number"
                  containerClassName="intl-tel-input"
                  inputClassName="input-box"
                  defaultCountry="np"
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
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="input-box"
                    id="password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="c_password"
                  >
                    Confirm Password
                  </label>
                  <input
                    required
                    value={rePassword}
                    onChange={(event) => setRePassword(event.target.value)}
                    className="input-box"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  disabled={state.notify.loading || false}
                  className="w-full tracking-widest px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {state.notify.loading ? (
                    <CircularProgress />
                  ) : (
                    "Register Account"
                  )}
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <Link href="/login">
                  <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                    Already have an account? Login
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signup;
