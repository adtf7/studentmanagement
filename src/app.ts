import express, { type Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";

import studentRouters from "./route.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = process.env.PORT||3333 ;
dotenv. config({ path: path.join(__dirname, "../.env") });
console.log( process.env.PORT)
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ Connected to Mongodb"))
  .catch((error) => console.error("❌ MongoDB connection failed:", error));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(express.static(path.join(__dirname, "../public")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", studentRouters);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});