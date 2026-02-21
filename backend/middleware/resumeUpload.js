import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "anbumani-portfolio-resume",
    resource_type: "raw",
    public_id: "Anbumani_Resume", // force fixed public id
  }),
});

const resumeUpload = multer({ storage: resumeStorage });

export default resumeUpload;