const path = require('path');
const fs = require('fs');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            uuidv4() + file.originalname
        );
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});

exports.imageUpload = upload.single('image');

exports.clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};
