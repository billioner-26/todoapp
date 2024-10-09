// Imported Modules And COmponents
import express from "express";
import dotenv from "dotenv";
import "./server/db/db.js";
import router from "./server/routes/route.js";
import cors from "cors";

// Uncaught exceptions Error

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down server on uncaught exception error");
  process.exit(1);
});

// DOtenv Configuration
dotenv.config();

// Rest Object
const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Rest API
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "The server is running",
  });
});

// Routes
app.use("/api", router);

// port
const port = process.env.PORT;
const node_env = process.env.NODE_ENV;

// Listen on port

const server = app.listen(port, () => {
  console.log(`Server is running in ${node_env} mode on port ${port}`);
});

// Shutting down server on unhandled error
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down server on unhandled server rejection error");
  server.close(() => {
    process.exit(1);
  });
});
