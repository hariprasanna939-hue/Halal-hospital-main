const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder }, (err, result) => {
                if (err) return reject(err);
                resolve(result.secure_url);
            })
            .end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;
