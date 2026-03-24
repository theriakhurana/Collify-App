import express from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  let { username, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  } catch (err) {
    throw err;
  }

  let newUser = await userModel.create({
    username,
    email,
    password,
    role,
  });

  res.send(newUser);
});

export default router;