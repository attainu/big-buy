import multer from "multer";

const multerConfigMemoryStorage = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  filefilter(req, { mimetype }, cb) {
    if (mimetype === "image/jpeg" || mimetype === "image/png") {
      cb(null, true);
    } else {
      const newError = new Error("file type is incorrect");
      cb(newError, false);
    }
  },
};

const upload = multer(multerConfigMemoryStorage);

export default upload;
