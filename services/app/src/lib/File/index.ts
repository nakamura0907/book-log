import multer from "multer";
import os from "os"
import path from "path"

export const storage = multer.diskStorage({
  destination: function(_, __, cb) {
    cb(null, os.tmpdir())
  },
  filename: function(_, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
