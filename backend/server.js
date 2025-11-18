const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./email");

const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const tutorialRoutes = require("./tutorials");

const app = express();
app.use(cors());
app.use(express.json());

// DB
let db = require("./db.json");

// save DB helper
function saveDB() {
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
}

// auto-create super admin
function ensureAdmin() {
  const exists = db.users.find(u => u.email === "pvansh830@gmail.com");
  if (!exists) {
    db.users.push({
      id: Date.now().toString(),
      name: "System Admin",
      email: "pvansh830@gmail.com",
      password: bcrypt.hashSync("Admin@123", 10),
      role: "admin",
      status: "approved",
      createdAt: new Date().toISOString()
    });
    saveDB();
  }
}
ensureAdmin();

// file upload storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// provide upload functionality to tutorial routes
app.use((req, res, next) => {
  req.upload = upload;
  req.db = db;
  req.saveDB = saveDB;
  next();
});

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tutorials", tutorialRoutes);

// static upload directory
app.use("/uploads", express.static("uploads"));

const PORT = 5000;
app.listen(PORT, () => console.log("Backend running on port " + PORT));
