const express = require("express");
const registerController = require("../../controllers/registerController");
const loginController = require("../../controllers/loginController");
const resendEmail = require("../../controllers/resendmailController");
const linkVerify = require("../../controllers/linkVerify");
const forgetPass = require("../../controllers/forgetpassController");
const newPassword = require("../../controllers/newPasswordController");
const emailVerifyCheck = require("../../middlewares/emailVerifyCheck");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", emailVerifyCheck, loginController);
router.post("/resendmail", resendEmail);
router.post("/linkverify", linkVerify);
router.post("/forgetpass", forgetPass);
router.post("/newpass", newPassword);

module.exports = router;
