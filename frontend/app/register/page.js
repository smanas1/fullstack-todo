"use client";
import { Button, TextField, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = () => {
  const user = useSelector((state) => state.user.user);
  useLayoutEffect(() => {
    if (user) {
      router.push("/todos");
    }
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/auth/register",
        {
          name: name,
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
        router.push("/");
      })
      .catch(({ response }) => {
        toast.error(response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(response);
      });
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-blue-100">
      <ToastContainer />
      <div className="bg-white py-8 px-7 rounded-md flex flex-col gap-y-6">
        <Typography textAlign="center" variant="h5">
          Register
        </Typography>

        <TextField
          label="Name"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
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
          Sign Up
        </Button>
        <Link className="text-center text-sm underline text-blue-400" href="/">
          GO TO Login Page
        </Link>
      </div>
    </div>
  );
};

export default Register;
