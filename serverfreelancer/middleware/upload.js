import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.floor(Math.random() * 100000)}-${file.originalname}`);
  },
});


const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); 
  } else {
    return cb(new Error("Invalid file type. Only jpeg, png, pdf are allowed."));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
