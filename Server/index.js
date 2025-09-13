import ecpress from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = ecpress();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
       .connect(MONGO_URL)
       .then(() => {
              console.log("Connected to MongoDB");
              app.listen(PORT, () => {
                     console.log(`Server is running on port ${PORT}`);
              })
       })
       .catch((error) => {
              console.log("Error connecting to MongoDB:", error);
       })

app.use("/api", route);