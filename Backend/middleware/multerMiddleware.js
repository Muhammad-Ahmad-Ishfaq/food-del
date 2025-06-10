import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      // 2daea1d8-2461-40da-ab63-ea020e0f4725.jpg
      const newFileName = uuidv4() + path.extname(file.originalname);
      cb(null, newFileName)
    }
  })
  
  export const upload = multer({ storage: storage })