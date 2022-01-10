import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/globalState";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { NOTIFY } from "../../store/constants";
import axios from "../../utils/axios";
import Router from "next/router";

function Token() {
  const { dispatch } = useContext(DataContext);

  const router = useRouter();
  const { token } = router.query;
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordTyped, setPasswordTyped] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const { password, confirmPassword } = passwords;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setPasswordTyped((prev) => ({ ...prev, [name]: true }));
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/auth/reset/${token}`, {
        password,
        confirmPassword,
      });
      dispatch({
        type: NOTIFY,
        payload: { success: "password changed successfully" },
      });
      Router.replace('/login');
    } catch (err) {
      dispatch({
        type: NOTIFY,
        payload: { error: err.response.data.message },
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setPasswordError({ password: false, setPassword: false });
    if (password.length < 8 && passwordTyped.password) {
      setPasswordError((prev) => ({ ...prev, password: true }));
    }
    if (password !== confirmPassword && passwordTyped.confirmPassword) {
      setPasswordError((prev) => ({ ...prev, confirmPassword: true }));
    }
  }, [passwords]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="bg-[#fff] p-5 shadow-md rounded-md mt-6 flex flex-col space-y-4 max-w-md mx-auto">
        <h2 className="font-medium text-lg lg:text-2xl tracking-wider">
          Password Reset
        </h2>
        <div className="border-b-2 border-gray-300" />
        <form onSubmit={onSubmitHandler} className="flex flex-col space-y-3">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={onChangeHandler}
            error={passwordError.password}
            helperText="password must have atleast 8 characters"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onChangeHandler}
            error={passwordError.confirmPassword}
            helperText="password & confirm password must match"
          />
          <div className="flex items-center space-x-4">
            <button
              disabled={loading}
              onClick={() => Router.replace("/login")}
              className="py-2 px-4 text-gray-700 bg-gray-300 hover:bg-gray-400 transition duration-300 ease-out text-lg font-medium tracking-wide rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 font-medium text-lg rounded-md tracking-wide text-[#fff] bg-[#1877f2] hover:bg-[#166fe5] transition duration-300 ease-out"
            >
              {loading ? <CircularProgress /> : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Token;
