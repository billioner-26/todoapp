// Imported Modules And COmponents
import { connect } from "mongoose";
import { config } from "dotenv";

// Dotenv configuration
config();

// MongoUrl
const url = process.env.MONGO_URL;

// Connecting mongoose to server
connect(url);
