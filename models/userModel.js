
const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
   firstName: String,
   lastName: String,
   city: String,
   companyName: String,
   email: String,
   companyRegNo: String,
   userPassword: {
                    type: String,
                     required: true
                }
  });



const Users = mongoose.model("Users", userSchema);


module.exports = Users;