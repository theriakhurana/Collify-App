import express from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  let { username, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let user = await userModel.create({
      username,
      email,
      password,
      role,
    });

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json(token);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie(token, { token });

    res.json(token);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
  });
  res.json({ msg: "Logged out" });
  res.redirect("/");
});

export default router;

// const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
// );
