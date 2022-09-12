
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
//const userAuth = require("../middlewares/userAuth");
//const adminAuth = require("../middlewares/adminAuth")

//signin route (employees/admin)
router.post("/signin", userController.signin);

//register user
router.post("/adduser", /*userAuth, adminAuth,*/ userController.addUser);

//change password router (employees/admin)
//router.post("/changepassword", userAuth, userControllers.changePassword)

//update user details (employees/admin)
//router.put("/update", userAuth, userControllers.updateUser);

//delete user (admin only)
//router.delete("/delete", userAuth, adminAuth,  userControllers.deleteUser);

//send mail (employees/admin)
//router.post("/sendmail", )

//export routes
module.exports = router