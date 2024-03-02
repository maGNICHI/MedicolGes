// const cloudinary = require('cloudinary').v2;
// const express = require('express');
// const app = express();

// // Cloudinary configuration
// const CLOUD_NAME = "dx7l2n0h6";
// const API_KEY = "924176283356352";
// const API_SECRET = "DWpL7d7tSbZi3TYmrqsZLnfl1CA";

// cloudinary.config({
//   cloud_name: CLOUD_NAME,
//   api_key: API_KEY,
//   api_secret: API_SECRET
// });

// // Example route that uploads an image to Cloudinary
// app.post('/upload', async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path); // Assuming req.file contains the image file
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Start server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
