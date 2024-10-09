// Imported Modules And Components
import Todo from "../model/model.js";

// Fetch Todo
export const AllTodo = async (req, res) => {
  const todo = await Todo.find();
  res.status(200).send({
    success: true,
    data: todo,
  });
};

// Add Todo Controller
export const addTodo = async (req, res) => {
  const { title, description, status } = req.body;

  const todo = await Todo.insertMany({ title, description, status });

  res.status(200).send({
    success: true,
    message: "Todo added successfully",
  });
};

// Delete All Todos
export const deleteAllTodos = async (req, res) => {
  await Todo.deleteMany({ status: "deleted" });

  res.status(200).send({
    success: true,
    message: "All todos deleted successfully",
  });
};

// update Todo
export const updateTodo = async (req, res) => {
  const _id = req.params.id;
  await Todo.findByIdAndUpdate(_id, req.body);

  res.status(200).send({
    success: true,
    message: "Todo updated successfully",
  });
};
