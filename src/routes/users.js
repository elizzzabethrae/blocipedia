const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users/signup", userController.signUp);
router.post("/users/signup", userController.create);
// router.get("/users/sign_in", userController.signInForm);
// router.post("/users/sign_in", userController.signUp);
// router.get("/users/sign_out", userController.signOut);


module.exports = router;
