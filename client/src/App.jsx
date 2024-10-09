import { useEffect, useState } from "react";
const App = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [todoStatus, setTodoStatus] = useState("all");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const AddTodo = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/add/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task, description }),
    });
    response = await response.json();
    if (response.success) {
      setTodoStatus("active");
      setTask("");
      setDescription("");
    }
  };

  useEffect(() => {
    const GetTodos = async () => {
      let response = await fetch("http://localhost:3000/api/get/todos");
      response = await response.json();
      setAllTasks(response.data);
      setActive(response.data.filter((task) => task.status === "active"));
      setCompleted(response.data.filter((task) => task.status === "completed"));
      setDeleted(response.data.filter((task) => task.status === "deleted"));
    };

    GetTodos();
  }, [todoStatus]);

  const CompleteHandler = async (id) => {
    let result = await fetch(`http://localhost:3000/api/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    result = await result.json();
    if (result.success) {
      return setTodoStatus("complete");
    }
  };

  const DeleteHandler = async (id) => {
    let result = await fetch(`http://localhost:3000/api/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "deleted" }),
    });
    result = await result.json();
    if (result.success) {
      return setTodoStatus("deleted");
    }
  };

  const RestoreHandler = async (id) => {
    let result = await fetch(`http://localhost:3000/api/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "active" }),
    });
    result = await result.json();
    if (result.success) {
      return setTodoStatus("active");
    }
  };

  const DeleteAllHandler = async () => {
    let result = await fetch(`http://localhost:3000/api/delete`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result.success) {
      return setTodoStatus("all");
    }
  };

  return (
    <section className="flex justify-center py-10 w-[550px] mx-auto">
      <div>
        <h1 className="font-bold text-4xl text-center py-4">Todo List</h1>
        <form onSubmit={AddTodo}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Add Task"
                value={task || ""}
                onChange={(e) => setTask(e.target.value)}
                className="border-solid border-2 rounded-sm font-semibold w-full p-2"
              />
            </div>
            <textarea
              placeholder="Add Description"
              rows={10}
              cols={60}
              className="border-solid border-2 rounded-sm resize-none p-2"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 px-[25px] my-5 text-white font-semibold py-2"
          >
            Add Task
          </button>
        </form>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTodoStatus("all")}
            className={`${
              todoStatus === "all" ? "bg-green-500 text-white" : "bg-green-200"
            } px-[25px] my-5 font-semibold py-2`}
          >
            All Todos
          </button>
          <button
            type="button"
            onClick={() => setTodoStatus("active")}
            className={`${
              todoStatus === "active"
                ? "bg-green-500 text-white"
                : "bg-green-200"
            } px-[25px] my-5 font-semibold py-2`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setTodoStatus("complete")}
            className={`${
              todoStatus === "complete"
                ? "bg-green-500 text-white"
                : "bg-green-200"
            } px-[25px] my-5 font-semibold py-2`}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => setTodoStatus("deleted")}
            className={`${
              todoStatus === "deleted"
                ? "bg-green-500 text-white"
                : "bg-green-200"
            } px-[25px] my-5 font-semibold py-2`}
          >
            Deleted
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {todoStatus === "all" ? (
            allTasks.length === 0 ? (
              <p>No tasks found</p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {todoStatus === "active" ? (
            active.length === 0 ? (
              <p>No tasks found</p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {todoStatus === "complete" ? (
            completed.length === 0 ? (
              <p>Noo tasks found</p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {todoStatus === "deleted" ? (
            deleted.length === 0 ? (
              <p>No tasks found</p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {todoStatus === "all"
            ? allTasks.map((task, key) => {
                return (
                  <div key={key} className="bg-green-100 rounded-md px-4 py-3">
                    <div>
                      <h2 className="font-bold text-lg">{task.title}</h2>
                      <p className="text-black/50 text-sm">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        className="bg-green-500 text-white text-sm px-4 py-1 rounded-md"
                        onClick={() => CompleteHandler(task._id)}
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 text-sm text-white px-4 rounded-md"
                        onClick={() => DeleteHandler(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            : todoStatus === "active"
            ? active.map((task, key) => {
                return (
                  <div key={key} className="bg-green-100 rounded-md px-4 py-3">
                    <h2 className="font-bold text-lg">{task.title}</h2>
                    <p className="text-black/50 text-sm">{task.description}</p>
                    <button
                      className="bg-red-500 text-sm text-white px-4 rounded-md mt-4"
                      onClick={() => DeleteHandler(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            : todoStatus === "complete"
            ? completed.map((task, key) => {
                return (
                  <div key={key} className="bg-green-100 rounded-md px-4 py-3">
                    <h2 className="font-bold text-lg">{task.title}</h2>
                    <p className="text-black/50 text-sm">{task.description}</p>
                    <button
                      className="bg-red-500 text-sm text-white px-4 py-1 rounded-md mt-4"
                      onClick={() => DeleteHandler(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            : todoStatus === "deleted"
            ? deleted.map((task, key) => {
                return (
                  <div key={key} className="bg-green-100 rounded-md px-4 py-3">
                    <h2 className="font-bold text-lg">{task.title}</h2>
                    <p className="text-black/50 text-sm">{task.description}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        className="bg-green-500 text-white text-sm px-4 py-1 rounded-md"
                        onClick={() => RestoreHandler(task._id)}
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
          {todoStatus === "deleted" && (
            <button
              type="button"
              className="bg-red-500 text-sm text-white px-4 rounded-md py-2"
              onClick={() => DeleteAllHandler()}
            >
              Delete All
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;
