import { useState } from "react";

const TodoList = () => {
  // Controlled input state for capturing user input text
  const [input, setInput] = useState("");

  // Array state storing all todo item objects
  const [todos, setTodos] = useState([]);

  // CREATE: Adds a new todo object to the list
  const addTodo = () => {
    // Guard Clause: Prevent creating empty or whitespace-only todos
    if (!input.trim()) return;

    // Construct the structured todo item model
    const todoItem = {
      id: crypto.randomUUID(), // Generates a unique string ID natively
      text: input,
      completed: false,
    };

    // Immutable state update using functional updater pattern to prevent stale closures
    setTodos((prev) => [...prev, todoItem]);

    // Clear input field after successfully adding todo
    setInput("");
  };

  // DELETE: Removes a todo by filtering out its unique ID
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // UPDATE: Toggles the completion status of a target todo item
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        // Flips 'completed' boolean for matching ID while preserving other item properties
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      {/* Input Control Area */}
      <div>
        <input
          type="text"
          placeholder="Enter todo"
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // Keyboard Accessibility: Allows submit on pressing "Enter" key
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button type="submit" onClick={addTodo} className="btn-add">
          Add
        </button>
      </div>

      {/* Todo List Items Area */}
      <div className="todo-items-container">
        <ul className="todo-list">
          {todos.map((todo) => (
            // Unique key prop is critical for React's reconciliation algorithm during array updates
            <li key={todo.id} className="todo-item">
              {/* Checkbox to toggle completion status */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              {/* Dynamic text visual treatment based on completion status */}
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>

              {/* Action button to delete todo item */}
              <button
                className="btn-delete"
                onClick={() => removeTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
