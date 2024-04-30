const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Correct the variable name here
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploads = (file, folder) => { 
    return new Promise(resolve => { 
        cloudinary.uploader.upload(file, (result) => { 
            resolve({ 
                url: result.url, 
                id: result.public_id, 
                resource_type: "auto", 
                folder: folder 
            }); 
        });
    });
}

exports.viewPictures = () => {
    return new Promise((resolve, reject) => {
        // Use the `list` method to fetch all resources (images) from Cloudinary
        cloudinary.api.resources((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.resources);
            }
        });
    });
};

// Function to delete a picture by its public ID
exports.deletePicture = (publicId) => {
    return new Promise((resolve, reject) => {
        // Use the `destroy` method to delete an image by its public ID
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const publicIdToDelete = '6de3c70b3b8a0a9a4de9abc8475c3bb1';
exports.deletePicture(publicIdToDelete)
    .then(deletedResult => {
        console.log("Deleted Picture Result:", deletedResult);
    })
    .catch(error => {
        console.error("Error:", error);
    });
