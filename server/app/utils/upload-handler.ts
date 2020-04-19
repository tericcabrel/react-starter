import * as path from 'path';
import multer from 'multer';

/** Storage Avatar */
const storageAvatar = multer.diskStorage({
	destination: './public/uploads/avatars',
	filename(req, file, fn) {
		fn(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
	},
});

export const uploadAvatar = multer({
	storage: storageAvatar,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter(req, file, callback) {
		const extension: boolean = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
		const mimeType: boolean = file.mimetype.indexOf('image') > 0;
		if (extension && mimeType) {
			return callback(null, true);
		}
		callback(new Error('Invalid file type. Only pictures are allowed !'), false);
	},
}).single('picture');

/** Storage File */
/*
const storageFile = multer.diskStorage({
  destination: './public/uploads/files',
  filename(req, file, fn) {
    fn(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});

export const uploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension: boolean = ['.json', '.csv'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType: boolean = file.mimetype.indexOf('image') > 0;
    if (extension && mimeType) {
      return callback(null, true);
    }
    callback(new Error('Invalid file type. Only JSON and CSV file are allowed !'));
  },
}).single('file');*/
