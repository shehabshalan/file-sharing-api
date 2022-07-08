const cloudinary = require("cloudinary").v2;

const checkFormat = require("./checkFormat");

const fileUploader = async (file) => {
  try {
    const fileUploaded = await cloudinary.uploader.upload(file.path, {
      folder: "library-files",
      resource_type: "auto",
      format: checkFormat(file.mimetype),
    });
    return fileUploaded;
  } catch (err) {
    console.log("Cloudinary error: ", err);
  }
};

module.exports = fileUploader;
