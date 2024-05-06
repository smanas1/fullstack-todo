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

export default function DenseTable() {
  const user = useSelector((state) => state.user.user);
  React.useLayoutEffect(() => {
    if (user.role == "user") {
      router.push("/todos");
    }
  });
  const router = useRouter();
  const [todo, setTodo] = React.useState();
  const [update, setUpdate] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/alltodos")
      .then((res) => {
        setTodo(res.data);
        console.log(res.data);
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
  console.log(todo);
  return (
    <div className="container m-auto">
      <ToastContainer />
      {todo && (
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
              {todo.map((item) => (
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
                        alt="Remy Sharp"
                        src={`http://localhost:8000${item.creator.profilePhoto}`}
                      />
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        src="https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
                      />
                    )}
                  </TableCell>
                  <TableCell>
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
