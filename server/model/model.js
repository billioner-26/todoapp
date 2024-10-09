// Imported Modules And Components
import { Schema, model } from "mongoose";

// Schema for todo
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLenght: [25, "Title cannot exceed 25 characters"],
  },
  description: {
    type: String,
    required: true,
    maxLenght: [100, "Title cannot exceed 100 characters"],
  },
  status: {
    type: String,
    enum: ["active", "completed", "deleted"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Todo = model("todos", todoSchema);
export default Todo;
