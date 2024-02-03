import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import authRouter from "./routes/router.js";
import passRouter from "./routes/pass.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "/.env") });
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err.message));
  app.use(express.json({ limit: "200mb" }));
  app.use(
    express.urlencoded({
      limit: "200mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(cookieParser());
 app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "*",
    credentials: true,
  })
);

  app.use("/auth",authRouter)
  app.use("/pass", passRouter);
  app.listen(process.env.PORTNUMBER, () =>
    console.log(`server started at ${process.env.PORTNUMBER}`)
  );