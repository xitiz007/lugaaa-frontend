import { useState, useContext } from "react";
import { DataContext } from "../store/globalState";
import Link from "next/link";
import { validateLogin } from "../utils/verifyCredential";
import { NOTIFY } from "../store/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cookie from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "../utils/axios";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch({ type: NOTIFY, payload: { loading: true } });
    try {
      validateLogin(email, password);
    } catch (err) {
      return dispatch({ type: NOTIFY, payload: { error: err.message } });
    }
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { message, accessToken } = response.data;
      Cookie.set("accessToken", accessToken);
      dispatch({ type: NOTIFY, payload: { success: message } });
      router.replace("/");
    } catch (err) {
      return dispatch({
        type: NOTIFY,
        payload: { error: err.response.data.message },
      });
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg md:flex-row flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-[#232f3e] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-2 text-2xl font-semibold tracking-widest text-center">
            <h2>Lugaaa</h2>
          </div>
          <p className="mt-4 text-sm md:text-base font-normal text-center text-gray-300 md:mt-0">
            Lugaaa is an ecommerce clothing store.
          </p>
          <p className="text-sm md:text-base flex flex-col items-center justify-center mt-5 text-center">
            <span>Don't have an account?</span>
            <Link href="/signup">
              <a className="underline">Sign up?</a>
            </Link>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={onSubmitHandler} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                required
                value={email}
                onChange={(event) => setEmail(event.target.value.toLowerCase())}
                type="email"
                id="email"
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                <a
                  href="/forgot_password"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                id="showpassword"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label
                htmlFor="showpassword"
                className="text-sm font-semibold text-gray-500"
              >
                show password
              </label>
            </div>
            <div>
              <button
                disabled={state.notify.loading || false}
                type="submit"
                className="w-full tracking-widest px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                {state.notify.loading ? <CircularProgress /> : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
