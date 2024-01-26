const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
router.get("/balance", authMiddleware, async (req, res, next) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.json({
      balance: account.balance,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/transfer", authMiddleware, async (req, res, next) => {
  try {
    const { to, amount } = req.body;

    const session = await mongoose.startSession();

    session.startTransaction();

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.findOneAndUpdate(
      { userId: req.userId },
      {
        $inc: { balance: -amount },
      }
    ).session(session);
    await Account.findOneAndUpdate(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
