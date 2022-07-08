require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const express = require("express");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
/// connect to mongoDB
connectDB();

// ** MIDDLEWARE **
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///  REST API
app.use("/files", require("./routes/files"));
app.use("/sharefile", require("./routes/shareFile"));

app.get("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.send({ error: "40 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected...");
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
});
