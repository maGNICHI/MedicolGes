const express = require('express');
const app = express();
require('dotenv').config(); 
const db = require('./ConfigDB/connection');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const upload = require('./multer')
const cloudinary= require('./cloudinary')
const fs = require ('fs')

app.listen(process.env.PORT, () => { 
    console.log('server started on port ' + (process.env.PORT));
});
db();

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api/project', require('./ProjectManagement/Routes/Project'))
app.use('/api/feedback', require('./ProjectManagement/Routes/Feedback'))
app.use('/form', require('./FormManagement/routes/FormRoutes'));
app.use("/api/posts", require("./ForumAndOrganizationManagement/routes/post.routes"));
app.use(
  "/api/organization",
  require("./ForumAndOrganizationManagement/routes/organization.routes")
);

app.use("/api/user", require("./UserManagement/Routes/User"));

//upload images
// app.post('/upload-images', upload.array('image'), async (req, res) => {
    
//     const uploader = async (path) => await cloudinary.uploads(path, 'Images');

//     if (req.method === 'POST') {
//         const urls = [];
//         const files = req.files;
//         for (const file of files) { 
//           const { path } = file;
//           const newPath = await uploader(path);
//           urls.push(newPath);
//           fs.unlinkSync(path);
//         }
//         res.status(200).json({
//             message: 'Images Uploaded Successfully',
//             urls: urls
//         });
//     } else {
//         res.status(405).json({
//             err: "Image not uploaded successfully"
//         });
//     }
// });
