const express = require('express');
const {signup, getUser, editUser, hardDelete, login, getAllUsers}= require('../controllers')
const authenticate = require('../middleware/authenticate')

const router = express.Router();

router.post("/signup",signup);
router.get("/getuser",authenticate, getUser);
router.put("/edituser",authenticate,editUser);
router.delete("/hardDelete/:id",authenticate,hardDelete);
router.get("/getAllUsers",authenticate,getAllUsers);
router.post("/login",login)

module.exports = router


