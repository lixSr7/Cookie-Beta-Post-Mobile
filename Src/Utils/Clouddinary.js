import { v2 as cloud } from "cloudinary";
import {
    CLOUD_NAME,
    API_KEY,
    API_SECRET
} from "../Config/Config.js";

//* Configuracion de Cloudinary

cloud.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true
});

//* Subida de imagenes a claudinary
export default async function uploadImage(filePath) {
    return await cloud.uploader.upload(
        filePath,
        {
            folder: 'PostsCookie'
        }
    );
}