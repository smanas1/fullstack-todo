const express = require("express");
const route = require("./auth/auth");
const secureApi = require("../middlewares/secureApi");
const postTodoControler = require("../controllers/postTodoController");
const getTodos = require("../controllers/getTodos");
const todoCompleteController = require("../controllers/todoCompleteController");
const todoDeleteController = require("../controllers/todoDeleteController");
const photoUploadController = require("../controllers/photoUploadController");
const uploads = require("../middlewares/multer");
const getUserController = require("../controllers/getUserController");
const verifyToken = require("../middlewares/verifyToken");
const getAllTodos = require("../controllers/getAllTodos");
const editTodoController = require("../controllers/editTodoControler");
const nameChangeController = require("../controllers/nameChangeController");

const router = express.Router();

router.use("/auth", secureApi, route);
router.post("/todos", verifyToken, postTodoControler);
router.get("/alltodos", getAllTodos);
router.post("/todolist", getTodos);
router.post("/todocomplete/:id", verifyToken, todoCompleteController);
router.delete("/tododelete/:id", verifyToken, todoDeleteController);
router.post("/photo", uploads.single("profile"), photoUploadController);
router.post("/user", getUserController);
router.post("/edit", editTodoController);
router.post("/namechange", nameChangeController);

module.exports = router;
