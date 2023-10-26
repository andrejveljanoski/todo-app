import { FC, useState } from "react";
import "./App.css";
import ToDoTask from "./Components/ToDoTask";
import { ITask } from "./interfaces";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const [count, setCount] = useState(0);

  const [todoList, setToDoList] = useState<ITask[]>([]);
  const form = useForm<ITask>({
    defaultValues: {
      taskName: "",
      deadline: 0,
    },
  });

  const addTask = (task: ITask): void => {
    setToDoList((e) => [
      ...e,
      {
        ...task,
        id: count,
      },
    ]);
    setCount((c) => c + 1);
  };

  const completeTask = (idToDelete: number): void => {
    toast(
      `Successfully deleted the task ${
        todoList.find((t) => t.id === idToDelete)?.taskName
      }`,
      {
        type: "success",
      }
    );
    setToDoList(
      todoList.filter((task) => {
        return task.id != idToDelete;
      })
    );
  };

  return (
    <div>
      <form
        className="header"
        onSubmit={form.handleSubmit(
          (data) => {
            addTask(data);
            toast("Successfully added new task!", {
              type: "success",
            });
            form.reset();
          },
          () =>
            toast("Invalid parameters. Please try again!", {
              type: "error",
            })
        )}
      >
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Assignee..."
            {...form.register("assignee", { required: true })}
          />
          <input
            type="text"
            placeholder="Task..."
            {...form.register("taskName", {
              required: true,
            })}
          />
          <input
            type="number"
            placeholder="Deadline (in days)..."
            {...form.register("deadline", { required: true, min: 1 })}
          />
        </div>
        <button type="submit">Add task</button>
      </form>
      <div className="todoList">
        {todoList.map((task: ITask) => {
          return (
            <ToDoTask key={task.id} task={task} completeTask={completeTask} />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
