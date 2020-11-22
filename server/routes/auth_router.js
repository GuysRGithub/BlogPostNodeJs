const express = require("express");
const router = express.Router();
const {
  registerController,
  activationController,
  loginController,
  forgetController,
  resetController,
  googleLoginController,
  facebookLoginController
} = require("../controllers/auth_controller");

const {
  validRegister,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

router.post("/register", validRegister, registerController);
router.post("/activation", activationController);
router.post("/login", validLogin, loginController);
router.put("/passwords/forget", forgotPasswordValidator, forgetController);
router.put("/passwords/reset", resetPasswordValidator, resetController);
router.post('/google/login', googleLoginController)

router.post('/facebook/login', facebookLoginController)
module.exports = router;
