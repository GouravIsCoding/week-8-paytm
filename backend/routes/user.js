const express = require("express");
const router = express.Router();
const {
  zodUserSchema,
  zodLoginSchema,
  zodUpdateUserSchema,
} = require("../validators/index");
const { jwtSecret } = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
  try {
    const { success } = zodUserSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }
    const existingUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken/Incorrect inputs",
      });
    }
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const userId = user._id;

    await Account.create({
      userId,
      balance: Math.floor(1 + Math.random() * 10000),
    });

    const token = jwt.sign(
      {
        userId,
      },
      jwtSecret
    );

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { success } = zodLoginSchema.safeParse({ username, password });
    if (!success) {
      return res.status(411).json({
        message: "Error while logging in",
      });
    }
    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(411).json({
        message: "Error while logging in",
      });
    const userId = user._id;

    const token = jwt.sign(
      {
        userId,
      },
      jwtSecret
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", authMiddleware, async (req, res, next) => {
  try {
    console.log("here");
    const { success } = zodUpdateUserSchema.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        message: "Error while updating information",
      });
    }
    await User.findByIdAndUpdate(req.userId, req.body);
    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/bulk", authMiddleware, async (req, res, next) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: new RegExp(filter, "i"),
        },
      },
      {
        lastName: {
          $regex: new RegExp(filter, "i"),
        },
      },
    ],
  });
  res.json({
    users: users
      .filter((user) => req.userId != user._id)
      .map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
  });
});

module.exports = router;
