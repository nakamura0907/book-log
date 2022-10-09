import multer from "multer";
import { storage } from "@/lib/File";

const fileUpload = multer({ storage, fileFilter(_, __, cb) {
    cb(null, true)
}, })

export default fileUpload