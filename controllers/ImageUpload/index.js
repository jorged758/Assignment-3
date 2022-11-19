const multer = require(`multer`);

const MIME_TYPES = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/jpg": "jpg",
};

const ImageUpload = multer({
  // maximum 2mb file size
  limits: {
    fileSize: 2 * 1000 * 1000,
  },
  storage: multer.diskStorage({
    // Destination directory to save images
    destination: (req, file, callback) => {
      callback(null, `public/images`);
    },
    // Filename with date to keep unique
    filename: (req, file, callback) => {
      const ext = MIME_TYPES[file.mimetype];
      callback(null, new Date().getTime() + `-----` + file.originalname);
    },
  }),
  // checks the mimetype of the file and return error if other than image are found

  fileFilter: (req, file, callback) => {
    let valid_file = !!MIME_TYPES[file.mimetype];
    let error_file = valid_file
      ? null
      : new Error(
          "Invalid Image Type, Please Choose (png,jpeg,jpg,webp) image type"
        );

    callback(error_file, valid_file);
  },
});

module.exports = ImageUpload;
