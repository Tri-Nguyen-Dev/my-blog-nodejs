import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.v2.config({
    cloud_name: 'acoci',
    api_key: '578287455873529',
    api_secret: '15Bep0srQvL15gcn9LhSoXvmAb8'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "DEV",
    },
});

const uploadCloud = multer({ storage });

export default uploadCloud