import mongoose from "mongoose";
import { MONGODB_URI } from "./Config.js"; // Recupera las variables de entorno

async function ConectionDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexion exitosa con Cookie DB");
  } catch (error) {
    console.log(`Error ${error}`);
  }
}

export default ConectionDB;
