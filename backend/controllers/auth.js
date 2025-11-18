const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./email");
const router = express.Router();

router.post("/register", (req, res) => {
  const db = req.db;
  const saveDB = req.saveDB;

  const { name, email, password, role, studentId } = req.body;

  // no manual admin creation
  if (role === "admin") {
    return res.status(403).json({ message: "Admin accounts cannot be self-created." });
  }

  // check duplicate email
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // validation for student
  if (role === "student" && !studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
    studentId: role === "student" ? studentId : null,
    status: "pending", // tutor or student must be approved
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB();

  // email main admin
  sendEmail(
    "pvansh830@gmail.com",
    "New User Pending Approval",
    `A new ${role} requires approval.\nName: ${name}\nEmail: ${email}`
  );

  return res.json({ message: "Registration successful. Await admin approval." });
});

router.post("/login", (req, res) => {
  const db = req.db;
  const { email, password } = req.body;

  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.role !== "admin" && user.status !== "approved") {
    return res.status(403).json({ message: "Your account is pending approval." });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "secret");

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  });
});

module.exports = router;
