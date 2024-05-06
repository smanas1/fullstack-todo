"use client";
import Image from "next/image";
const image = "/user.png";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { activeUser } from "../redux/userSlice";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0 solid #fff",
  boxShadow: 24,
  p: 4,
};
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useLayoutEffect(() => {
    if (!user) {
      router.push("/");
    }
  });
  const [todo, setTodo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [todos, setTodos] = useState([]);
  const [des, setDes] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateuser, setUpdateuser] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get User
  useEffect(() => {
    axios.post("http://localhost:8000/user", { id: user.id }).then((res) => {
      setUserInfo(res.data);
    });
  }, [updateuser]);
  // Get Todos
  useEffect(() => {
    axios
      .post("http://localhost:8000/todolist", {
        id: user.id,
      })
      .then((response) => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/todos",
        {
          todo: todo,
          des: des,
          creator: user.id,
        },
        {
          headers: {
            token: user.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUpdate((update) => !update);
        setTodo("");
        setDes("");
      })
      .catch((error) => {
        if (error.response.status == "401") {
          setTimeout(() => {
            localStorage.removeItem("user");
            dispatch(activeUser(false));
          }, 3000);
        }
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
        setTodo("");
        setDes("");
      });
  };

  console.log(userInfo);

  const handleComplete = (e) => {
    axios
      .post(
        `http://localhost:8000/todocomplete/${e}`,
        {},
        {
          headers: {
            token: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUpdate((update) => !update);
      })
      .catch((error) => {
        console.log(error);
        setUpdate((update) => !update);
        if (error.response.status == "401") {
          setTimeout(() => {
            localStorage.removeItem("user");
            dispatch(activeUser(false));
          }, 3000);
        }
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
  const handleDelete = (e) => {
    axios
      .delete(
        `http://localhost:8000/tododelete/${e}`,

        {
          headers: {
            token: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUpdate((update) => !update);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == "401") {
          setTimeout(() => {
            localStorage.removeItem("user");
            dispatch(activeUser(false));
          }, 3000);
        }
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

  const handlePhoto = (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);
    axios
      .post("http://localhost:8000/photo", formData, {
        headers: {
          userid: user.id,
        },
      })
      .then((res) => {
        console.log(res);
        setOpen(false);
        setUpdateuser((update) => !update);
      });
  };

  return (
    <div className="bg-blue-100 h-screen">
      <ToastContainer />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={(e) => handlePhoto(e)}
            >
              Upload Photo
              <VisuallyHiddenInput
                type="file"
                accept="image/png, image/jpeg"
                name="profile"
              />
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="  w-screen flex justify-center items-center bg-blue-100 ">
        <div className="bg-white shadow-lg my-9 py-16 px-5 rounded-lg relative">
          <div className="   cursor-pointer flex flex-col justify-center items-center absolute right-3 top-3">
            {userInfo && (
              <>
                {userInfo.profilePhoto ? (
                  <Image
                    onClick={handleOpen}
                    className=" object-cover rounded-full w-16 h-16"
                    src={`http://localhost:8000${userInfo.profilePhoto}`}
                    width={100}
                    height={100}
                    alt="userImage"
                  />
                ) : (
                  <Image
                    onClick={handleOpen}
                    className=" object-cover rounded-full w-16 h-16"
                    src="https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
                    width={100}
                    height={100}
                    alt="userImage"
                  />
                )}

                <h2 className="text-lg font-semibold capitalize">
                  {userInfo.name}
                </h2>
              </>
            )}
          </div>
          {/* Task Part */}
          <div className="flex flex-col justify-center items-center">
            <div className="bg-blue-500 flex w-[61px] h-[60px] justify-center items-center p-3 rounded-full">
              <ListAltIcon fontSize="large" sx={{ color: "white" }} />
            </div>
            <h1 className="text-3xl font-bold my-3">List of Taks</h1>
            <p className="text-gray-500">Facilite sua ida ao supermercado!</p>
            <hr className="h-1 w-1/2 mt-3" />
          </div>
          {/* Inputs */}
          <div className="flex gap-3 mt-5">
            <TextField
              onChange={(e) => setTodo(e.target.value)}
              label="Title"
              id="outlined-size-small"
              size="small"
              value={todo}
              required
            />
            <TextField
              label="Description"
              id="outlined-size-small"
              size="small"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              sx={{ fontSize: "20px", padding: "0" }}
              variant="contained"
              size="small"
            >
              +
            </Button>
          </div>
          {/* List */}
          <div className="mt-5">
            {todos.map(
              (item, i) =>
                item.status == "running" && (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          {...label}
                          color="success"
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CheckCircleIcon />}
                          onClick={() => handleComplete(item._id)}
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{item.todo}</h3>
                          {item.des && (
                            <p className="text-gray-500">{item.des}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          color="error"
                          onClick={() => handleDelete(item._id)}
                        />
                      </div>
                    </div>
                    <hr className="my-2" />
                  </div>
                )
            )}
          </div>
          {/* Compelted items */}
          <div className="flex justify-center">
            <hr className="mt-16 w-1/2 " />
          </div>
          <h2 className="text-3xl text-center mt-5 font-medium">
            Completed Items
          </h2>
          <div className="mt-5">
            {todos.map(
              (item, i) =>
                item.status == "completed" && (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center ">
                        <DoneIcon className="text-green-600 mx-3" />
                        <div>
                          <h3 className="text-lg text-gray-400 font-semibold">
                            <del>{item.todo}</del>
                          </h3>
                          <p className="text-gray-400">
                            <del>{item.des}</del>
                          </p>
                        </div>
                      </div>
                      <div>
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          color="error"
                          onClick={() => handleDelete(item._id)}
                        />
                      </div>
                    </div>
                    <hr className="my-2" />
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
