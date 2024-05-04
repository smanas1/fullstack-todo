"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const LinkVerify = () => {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/auth/linkverify",
        {
          token: params.token,
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
        if (err.response.data.message) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        toast.warning(err.response.data, {
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
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ToastContainer />
      <h1 className="text-4xl mb-6">Email verfication </h1>
      <div>
        <Button
          className="ms-5"
          onClick={() => router.push("/")}
          variant="contained"
        >
          Go To Login
        </Button>
      </div>
    </div>
  );
};

export default LinkVerify;
