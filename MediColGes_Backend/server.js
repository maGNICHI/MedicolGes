const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./ConfigDB/connection");
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const fs = require("fs");

app.listen(process.env.PORT, () => {
  console.log("server started on port " + process.env.PORT);
});
db();

app.use(express.json());

const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/api/posts", require("./ForumAndOrganizationManagement/routes/post.routes"));
app.use(
  "/api/organization",
  require("./ForumAndOrganizationManagement/routes/organization.routes")
);


// app.post("/upload-images", upload.array("image"), async (req, res) => {
//   const uploader = async (path) => await cloudinary.uploads(path, "Images");

//   if (req.method === "POST") {
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }
//     res.status(200).json({
//       message: "Images Uploaded Successfully",
//       urls: urls,
//     });
//   } else {
//     res.status(405).json({
//       err: "Image not uploaded successfully",
//     });
//   }
// });
