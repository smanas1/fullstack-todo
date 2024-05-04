"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};
const ForgetPass = () => {
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/auth/forgetpass",
        {
          email: email,
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
        setOpen(false);
      })

      .catch((err) => {
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
        console.log(err);
      });
  };
  return (
    <div>
      <p
        className="underline text-sm text-blue-400 cursor-pointer"
        onClick={handleOpen}
      >
        Forget Password
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Forget Password
          </Typography>
          <div className="mt-5 flex justify-between">
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              label="Enter Your Email"
              id="outlined-size-small"
              size="small"
            />
            <Button variant="contained" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ForgetPass;
