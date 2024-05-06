"use client";
import { Button, TextField, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "./redux/userSlice";
import ResendMail from "./components/ResendMail";
import ForgetPass from "./components/ForgetPass";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Login = () => {
  const user = useSelector((state) => state.user.user);
  useLayoutEffect(() => {
    if (user) {
      router.push("/todos");
    }
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            key: "KRfqlnodZgMRiFS",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(activeUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/todos");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-blue-100">
      <ToastContainer />
      <div className="bg-white py-8 px-7 rounded-md flex flex-col gap-y-6">
        <Typography textAlign="center" variant="h5">
          Login
        </Typography>

        <TextField
          label="Email"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          className="shadow-none "
          color="primary"
          variant="contained"
        >
          Sign In
        </Button>
        <Link
          className="text-center text-sm underline text-blue-400"
          href="/register"
        >
          GO TO Register Page
        </Link>
        <hr />
        <div className="flex justify-between">
          <ResendMail />
          <ForgetPass />
        </div>
      </div>
    </div>
  );
};

export default Login;
