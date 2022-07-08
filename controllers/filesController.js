const File = require("../models/File");
const formatData = require("../utils/formatData");
const fileUploader = require("../utils/fileUploader");
const getFiles = async (req, res) => {
  try {
    const files = await File.find();
    if (!files) return res.status(404).send({ message: "No files found" });
    res.json({ result: files });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFileById = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "ID is required" });
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "ID is not valid" });
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) return res.status(201).json({ message: "file not found" });
    res.json({ result: file });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (req?.files.length === 0)
      return res.status(400).json({ message: "No file uploaded" });
    const files = req.files;
    const filesUploaded = await Promise.all(
      files.map((file) => fileUploader(file))
    );
    const result = formatData(files, filesUploaded);
    const newFiles = await File.insertMany(result);
    res.status(200).json({ result: newFiles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "ID is required" });
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "ID is not valid" });
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res
        .status(204)
        .json({ message: `File ID ${req.params.id} not found` });
    }
    const result = await file.remove();
    res.json({ message: "File deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// updateFileDownload
const updateFileDownload = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "ID is required" });
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "ID is not valid" });
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res
        .status(204)
        .json({ message: `File ID ${req.params.id} not found` });
    }
    const result = await file.updateOne({ $inc: { downloads: 1 } });
    res.json({ result: `File updated ` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getFiles,
  getFileById,
  uploadFile,
  deleteFile,
  updateFileDownload,
};
