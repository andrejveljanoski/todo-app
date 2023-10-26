import { render, fireEvent } from "@testing-library/react";
import ToDoTask from "../Components/ToDoTask";
import jest from "jest-mock";

const mockCompleteTask = jest.fn();

const task = {
  id: 1,
  assignee: "John",
  taskName: "Example Task",
  deadline: 10,
};

it("renders ToDoTask component", () => {
  const { getByText } = render(
    <ToDoTask task={task} completeTask={mockCompleteTask} />
  );

  expect(getByText("John")).toBeInTheDocument();
  expect(getByText("Example Task")).toBeInTheDocument();
  expect(getByText(10)).toBeInTheDocument();
});

test("calls completeTask when button is clicked", () => {
  const { getByText } = render(
    <ToDoTask task={task} completeTask={mockCompleteTask} />
  );
  const deleteButton = getByText("X");

  fireEvent.click(deleteButton);

  expect(mockCompleteTask).toHaveBeenCalledWith(1);
});
