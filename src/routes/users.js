const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");


router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUserSignIn, userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.post("/users", validation.validateUsers, userController.create);
router.post("/users/:id/downgrade", userController.downgradeForm);
router.get("/users/:id/upgrade", userController.upgrade);


module.exports = router;
