// Imported Modules And Components
import { Router } from "express";
import {
  addTodo,
  AllTodo,
  deleteAllTodos,
  updateTodo,
} from "../controllers/controller.js";

// Rest Object
const router = Router();

// all task
router.get("/get/todos", AllTodo);

// add todo
router.post("/add/todo", addTodo);
// Delete All todo
router.delete("/delete", deleteAllTodos);
// update Todo
router.put("/update/:id", updateTodo);

// Export
export default router;
