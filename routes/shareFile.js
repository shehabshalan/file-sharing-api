const express = require("express");
const router = express.Router();

const {
  getSharedFileById,
  createSharedFile,
  getSharedFiles,
} = require("../controllers/shareFileController");

router.route("/").post(createSharedFile).get(getSharedFiles);
router.get("/:id", getSharedFileById);

module.exports = router;
