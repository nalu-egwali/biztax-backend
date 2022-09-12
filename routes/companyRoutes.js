const express = require('express');
const router = express.Router();
const companyController = require("../controllers/companyController");
//const userAuth = require("../middlewares/userAuth");
//const adminAuth = require("../middlewares/adminAuth")

//signin route (employees/admin)
//router.post("/signin", companyController.signin);

//add employee route (admin only)
router.post("/addcompany",/* userAuth, adminAuth, */companyController.addCompany);

//change password router (employees/admin)
//router.post("/changepassword",/* userAuth,*/ companyController.changePassword)

//update user details (employees/admin)
//router.put("/update", /*userAuth, companyController.updateCompany);

//delete user (admin only)
//router.delete("/delete", userAuth, adminAuth,  companyController.deleteCompany);

//send mail (employees/admin)
//router.post("/sendmail", )

//export the routes
module.exports = router