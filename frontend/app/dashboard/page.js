"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { activeUser } from "../redux/userSlice";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const styleProfile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

export default function DenseTable() {
  const user = useSelector((state) => state.user.user);
  React.useLayoutEffect(() => {
    if (user.role == "user") {
      router.push("/todos");
    }
  }, []);
  const router = useRouter();
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoId, setTodoId] = React.useState("");
  const [des, setDes] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // Profile
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");
  const [role, setRole] = React.useState("");

  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = (e) => {
    setName(e.name);
    setEmail(e.email);
    setRole(e.role);
    setId(e._id);
    setOpenProfile(true);
  };
  const handleProfileSubmit = (e) => {
    axios
      .post("http://localhost:8000/profileupdate", {
        id: id,
        name: name,
        role: role,
      })
      .then((res) => {
        setUpdate((update) => !update);
        setOpenProfile(false);
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
      })
      .catch((err) => {
        console.log(err);
        setOpenProfile(false);
      });
  };
  const handleCloseProfile = () => setOpenProfile(false);

  const handleOpen = (e) => {
    setTodo(e.todo);
    setDes(e.des);
    setTodoId(e._id);
    console.log(e);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleUpdateSubmit = () => {
    axios
      .post("http://localhost:8000/edit", {
        todo: todo,
        des: des,
        id: todoId,
      })
      .then((res) => {
        setTodo("");
        setDes("");
        setTodoId("");
        setOpen(false);
        setUpdate((update) => !update);
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
      })
      .catch((err) => {
        setOpen(false);
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

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/alltodos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {});
  }, [update]);

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
        if (error.response.status == "401") {
          setTimeout(() => {
            localStorage.removeItem("user");
            dispatch(activeUser(false));
            router.push("/");
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
  console.log(role);
  return (
    <div className="container m-auto">
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full">
            <TextField
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              label="Todo"
              id="outlined-size-small"
              size="small"
            />
            <TextField
              value={des}
              onChange={(e) => setDes(e.target.value)}
              label="Des"
              id="outlined-size-small"
              size="small"
            />
            <Button
              size="small"
              onClick={handleUpdateSubmit}
              variant="contained"
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Profile Model */}

      <Modal
        open={openProfile}
        onClose={handleCloseProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleProfile}>
          <div className="flex flex-col justify-between h-full">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              id="outlined-size-small"
              size="small"
            />
            <TextField
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              disabled
              id="outlined-size-small"
              size="small"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{role}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleRole}
              >
                <MenuItem value={`user`}>User</MenuItem>
                <MenuItem value={`manager`}>Manager</MenuItem>
                <MenuItem value={`admin`}>Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              size="small"
              onClick={handleProfileSubmit}
              variant="contained"
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>
      {todos && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Todo</TableCell>
                <TableCell>Des</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Profile</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((item) => (
                <TableRow
                  key={item.todo}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.todo}
                  </TableCell>
                  <TableCell>{item.des}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.creator.name}</TableCell>
                  <TableCell>
                    {item.creator.profilePhoto ? (
                      <Avatar
                        onClick={() => handleOpenProfile(item.creator)}
                        alt="Remy Sharp"
                        src={`http://localhost:8000${item.creator.profilePhoto}`}
                      />
                    ) : (
                      <Avatar
                        onClick={handleOpenProfile}
                        alt="Remy Sharp"
                        src="https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <BorderColorIcon
                      onClick={() => handleOpen(item)}
                      sx={{ cursor: "pointer", marginRight: "10px" }}
                      color="success"
                    />
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
