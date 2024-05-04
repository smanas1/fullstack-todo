"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

const page = () => {
  const [password, setPassword] = useState("");
  const params = useParams();
  const router = useRouter();
  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/auth/newpass",
        {
          token: params.token,
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
        toast.success(res.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data, {
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
    <div className="flex justify-center items-center h-screen flex-col">
      <ToastContainer />
      <div className="">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Forget Password
        </Typography>
        <div className="mt-5 flex w-80 justify-between">
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Enter Your Password"
            id="outlined-size-small"
            size="small"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </div>
        <hr className="mt-5" />
        <div className="mt-5">
          <Button onClick={() => router.push("/")} variant="contained">
            Go To Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
