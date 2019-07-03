// modules import
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/UserController");

// db instance connection
require("./config/db");

// initialize express
const app = express();

const port = 8890;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --- API ENDPOINTS ---

// to list all users
app.route("/users")
  .get(userController.list_All_Users)

// to create a new user  
app.route("/user/create")
  .post(userController.create_New_User);

app.route("/user/:userid")
  // to display content user 
  .get(userController.display_User)
  // to update content user
  .put(userController.update_User)

// to delete user  
app.route("/user/delete/:userid")  
  .delete(userController.delete_User);

// displaying a message when server is running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});