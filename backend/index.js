import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import mongoose from "mongoose";
import "dotenv/config";
import CookieParser from "cookie-parser";
import { CustomError, errorMiddleware } from "./error/error.js";
import userRoutes from "./routers/User.js";
import websocketServer from "./ws.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(CookieParser());
// app.use(express.static(path.join(__dirname,"../real_time/dist")));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://goss-app.netlify.app",
      "http://192.168.29.196:5173",
    ],
    credentials: true,
  })
);

async function Database() {
  try {
    const connectedData = await mongoose.connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(`connected to ${connectedData.connection.host}`);
  } catch (er) {
    console.log("unable to connect database", er);
  }
}

Database();
const expressServer = app.listen(8080, () =>
  console.log("Express server running on port 8080")
);


websocketServer(expressServer);

app.use("/api/user", userRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../real_time/dist", "index.html"));
});

app.all("*", (req, res, next) => {
  next(
    new CustomError(`The requested URL ${req.originalUrl} was not found`, 404)
  );
});
app.use(errorMiddleware);
