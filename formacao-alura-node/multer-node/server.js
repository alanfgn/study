const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.filename}-${Date.now()}.${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

app.use(express.static("public"));

app.post("/file/upload", upload.single("file"), (req, res) => {
  res.send("Upload foi sucesso");
});

app.listen(3000, () => console.log("App na porta 3000"));
