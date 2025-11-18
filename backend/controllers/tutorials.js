const express = require("express");
const router = express.Router();

// Upload tutorial
router.post("/upload", (req, res) => {
  const db = req.db;
  const saveDB = req.saveDB;
  const upload = req.upload.single("file");

  upload(req, res, function (err) {
    if (err) return res.status(400).json({ message: "Upload error" });

    const { title, subject, description } = req.body;
    const user = db.users.find(u => u.id === req.headers.userid);

    if (!user) return res.status(403).json({ message: "Invalid user" });

    // tutor must be verified
    if (user.role === "tutor" && user.status !== "approved") {
      return res.status(403).json({ message: "Tutor not yet approved" });
    }

    const newTut = {
      id: Date.now().toString(),
      title,
      subject,
      description,
      tutorId: user.id,
      file: req.file ? "/uploads/" + req.file.filename : null,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    db.tutorials.push(newTut);
    saveDB();

    res.json({ message: "Tutorial uploaded and awaits admin approval." });
  });
});

// get approved tutorials
router.get("/", (req, res) => {
  const db = req.db;
  const approved = db.tutorials.filter(t => t.status === "approved");
  res.json(approved);
});

// admin view all tutorials
router.get("/all", (req, res) => {
  const db = req.db;
  res.json(db.tutorials);
});

// admin approve tutorial
router.put("/approve/:id", (req, res) => {
  const db = req.db;
  const saveDB = req.saveDB;

  const tut = db.tutorials.find(t => t.id === req.params.id);
  if (!tut) return res.status(404).json({ message: "Not found" });

  tut.status = "approved";
  saveDB();

  res.json({ message: "Tutorial approved" });
});

// Rate tutorial
router.post("/:id/rate", (req, res) => {
  const db = req.db;
  const saveDB = req.saveDB;

  const tut = db.tutorials.find(t => t.id === req.params.id);
  if (!tut) return res.status(404).json({ message: "Tutorial not found" });

  const rating = {
    userId: req.body.userId,
    rating: req.body.rating,
    comment: req.body.comment || "",
    date: new Date().toISOString()
  };

  if (!tut.ratings) tut.ratings = [];
  tut.ratings.push(rating);
  saveDB();

  res.json({ message: "Rating submitted" });
});

module.exports = router;
