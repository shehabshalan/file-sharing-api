const ShareFile = require("../models/ShareFile");
const File = require("../models/File");
const moment = require("moment");

const getSharedFiles = async (req, res) => {
  try {
    const sharedFiles = await ShareFile.find();
    if (!sharedFiles)
      return res.status(404).send({ message: "No files found" });
    res.status(200).json({ result: sharedFiles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSharedFileById = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "ID is required" });
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "ID is not valid" });
    const id = req.params.id;
    const sharedFile = await ShareFile.findById(id);
    if (!sharedFile) return res.status(201).json({ message: "file not found" });

    const now = moment().toDate();
    const expiresAt = moment(sharedFile.expiresAt).toDate();
    if (now > expiresAt) {
      // await ShareFile.findByIdAndDelete(id);
      return res.status(403).json({ message: "file expired" });
    }

    const file = await File.findById(sharedFile.fileId);
    if (!file) return res.status(201).json({ message: "file not found" });

    res.status(200).json({ result: file });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createSharedFile = async (req, res) => {
  try {
    const { fileId, expiresAt } = req.body;
    if (!fileId || !expiresAt)
      return res
        .status(400)
        .json({ message: "File ID and expiration date are required" });
    const newFile = await ShareFile.create({ fileId, expiresAt });
    res.status(201).json({
      result: `http://localhost:3000/sharefile/${newFile._id}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSharedFileById,
  createSharedFile,
  getSharedFiles,
};
