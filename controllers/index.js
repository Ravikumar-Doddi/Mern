require("dotenv").config();
const connection = require("../database");
const bcrypt = require("bcrypt");
const { commonResponse } = require("../common");
const {
  createUser,
  fetchUser,
  fetchAllUsers,
  updateUser,
  deleteUserAccount,
  loginCheck,
} = require("../models");

const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const loginUser = req.body.name;
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashPassword };

  createUser(connection, user, (err, result) => {
    commonResponse({
      res,
      success: err ? false : true,
      message: err ? "This Email already exists" : "User Created Successfully",
      data: null,
      loginUser,
    });
  });
};

const getUser = (req, res) => {
  fetchUser(connection, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.length > 0 ? true : false,
      message:
        users.length > 0 ? "User Fetched Successfully" : "User Not Found",
      data: users,
    });
  });
};

const getAllUsers = (req, res) => {
  fetchAllUsers(connection, (err, users) => {
    commonResponse({
      res,
      success: users.length > 0 ? true : false,
      message:
        users.length > 0 ? "User Fetched Successfully" : "User Not Found",
      data: users,
    });
  });
};

const editUser = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashPassword };
  updateUser(connection, user, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false,
      message: users.affectedRows > 0 && "User Updated Successfully",
      data: null,
    });
  });
};

const deleteUser = (req, res) => {
  const user = { ...req.body, ActiveStatus: false };

  updateUser(connection, user, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false,
      message:
        users.affectedRows > 0 ? "User Deleted Successfully" : "User Not Found",
      data: null,
    });
  });
};

const hardDelete = (req, res) => {
  const { id } = req.params;
  deleteUserAccount(connection, id, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false,
      message:
        users.affectedRows > 0 ? "User Deleted Permenently" : "User Not Found",
      data: null,
    });
  });
};

const login = (req, res) => {
  loginCheck(connection, req.body.email, async (err, users) => {
    console.log(users);

    const { name } = users[0];
    if (users.length > 0) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        users[0].password
      );
      if (validPassword) {
        const token = jwt.sign({ ...users[0] }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        commonResponse({
          res,
          success: true,
          message: "User login Successfully",
          data: name,
          token,
        });
      } else {
        res.send({ success: false, message: "Incorrect Password" });
      }
    } else {
      res.send({ success: false, message: "User not found" });
    }
  });
};

module.exports = {
  signup,
  getUser,
  editUser,
  deleteUser,
  hardDelete,
  login,
  getAllUsers,
};
