import Head from "next/head";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState, useContext } from "react";
import { DataContext } from "../../store/globalState";
import CircularProgress from "@mui/material/CircularProgress";
import { NOTIFY } from "../../store/constants";
import axios from "../../utils/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(DataContext);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    try{
        const response = await axios.post("/auth/reset", {email});
        dispatch({ type: NOTIFY, payload: { success: response.data.message } });
        setEmail('');
    }
    catch(err)
    {
        dispatch({
          type: NOTIFY,
          payload: { error: err.response.data.message },
        });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="flex flex-col max-w-lg mx-auto space-y-3 bg-[#fff] p-4 mt-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold tracking-wider">
          Find Your Account
        </h2>
        <div className="border-b-2 border-gray-300" />
        <p className="font-medium text-base tracking-wide">
          Please enter your email to search for your account.
        </p>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
          <div className="border-b-2 border-gray-300" />
          <div className="flex items-center justify-end space-x-2">
            <Link href="/login">
              <a className="py-2 px-4 text-base font-semibold tracking-wide rounded-md bg-gray-200 text-gray-600">
                Cancel
              </a>
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="py-2 px-4 text-base font-semibold tracking-wide bg-[#3c77f2] hover:bg-[#366fdb] transition duration-300 ease-out text-white rounded-md"
            >
              {loading ? <CircularProgress className="text-white" /> : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
