const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({});

let upload = multer({ storage: storage });
const {
  getFiles,
  getFileById,
  uploadFile,
  deleteFile,
  updateFileDownload,
} = require("../controllers/filesController");

router.route("/").get(getFiles).post(upload.array("myfile"), uploadFile);
router.get("/:id", getFileById);
router.delete("/:id", deleteFile);
router.put("/:id", updateFileDownload);

module.exports = router;
