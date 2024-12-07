const express = require('express');
const app = express();

app.use(express.json());

// Correct the import of the userController
const userController = require('../controllers/user.controller')

// Use the correct route and controller function
app.get("/:id", userController.getAllUser);  // Corrected the path and method
app.post("/", userController.addUser);
app.put("/:id", userController.updateUser)
app.delete("/:id", userController.deleteUser);

module.exports = app

let { validateUser} = require(`../middleware/user-validation`)
app.post("/", [validateUser],userController.addUser)
app.put("/:id", [validateUser], userController.updateUser)
