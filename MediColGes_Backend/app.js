const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables
const db = require('./ConfigDB/connection');
const upload = require('./multer')
const cloudinary= require('./cloudinary')
const fs = require ('fs')
app.post('/upload-images', upload.array('image'), async (req, res) => {
    
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    if (req.method === 'POST') {
        const urls = [];
        const files = req.files;
        for (const file of files) { 
          const { path } = file;
          const newPath = await uploader(path);
          urls.push(newPath);
          fs.unlinkSync(path);
        }
        res.status(200).json({
            message: 'Images Uploaded Successfully',
            urls: urls
        });
    } else {
        res.status(405).json({
            err: "Image not uploaded successfully"
        });
    }
});

app.listen(process.env.PORT, () => { // Using PORT from environment variables or default to 3001
    console.log('server started on port ' + (process.env.PORT));
});
db();

app.use(express.json())
// routes
app.use('/api/project', require('./ProjectManagement/Routes/Project'))
app.use('/api/feedback', require('./ProjectManagement/Routes/Feedback'))