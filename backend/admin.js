const express = require("express");
const router = express.Router();
const { sendEmail } = require("./email");

// Approve user (student or tutor)
router.put("/approve/:id", (req, res) => {
  const db = req.db;
  const saveDB = req.saveDB;

  const id = req.params.id;
  const user = db.users.find(u => u.id === id);

  if (!user) return res.status(404).json({ message: "User not found." });

  user.status = "approved";
  saveDB();

  // notify user
  sendEmail(
    user.email,
    "Account Approved",
    `Dear ${user.name}, your account has been approved. You may now log in.`
  );

  res.json({ message: "User approved successfully." });
});

// list pending users
router.get("/pending", (req, res) => {
  const db = req.db;
  const pending = db.users.filter(u => u.status === "pending");
  res.json(pending);
});

module.exports = router;
