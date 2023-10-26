import { render, fireEvent } from "@testing-library/react";
import ToDoTask from "../Components/ToDoTask";
import jest from "jest-mock";

// Mock the completeTask function
const mockCompleteTask = jest.fn();

const task = {
  assignee: "John",
  taskName: "Example Task",
  deadline: 8,
  id: 1,
};

test("calls completeTask when delete button is clicked", () => {
  const { getByText } = render(
    <ToDoTask task={task} completeTask={mockCompleteTask} />
  );
  const deleteButton = getByText("X");

  fireEvent.click(deleteButton);

  // Check if the completeTask function was called with the correct task ID
  expect(mockCompleteTask).toHaveBeenCalledWith(1);
});
