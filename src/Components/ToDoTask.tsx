import { ITask } from "../interfaces";

interface Props {
  task: ITask;
  completeTask(idToDelete: number): void;
}

const ToDoTask = ({ task, completeTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.assignee}</span>
        <span>{task.taskName}</span>
        <span>{task.deadline}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default ToDoTask;
