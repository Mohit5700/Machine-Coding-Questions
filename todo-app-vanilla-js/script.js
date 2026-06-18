document.addEventListener("DOMContentLoaded", function () {
  // --- 1. DOM Element Selection ---
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoSubmit = document.querySelector(".todo-submit");
  const todoList = document.querySelector(".todo-list");

  // --- 2. State Management ---
  // Tracks if we are currently updating an existing item or creating a new one
  let editMode = false;
  // Stores the reference to the specific <li> element being edited
  let editItem = null;

  // --- 3. Form Submission Logic ---
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the page from refreshing on submit
    const todoText = todoInput.value.trim(); // Removes unnecessary whitespace

    if (!todoText) {
      alert("Please enter a valid task");
      return;
    }

    if (editMode) {
      // UPDATE: If in edit mode, update the text of the existing item
      editItem.firstChild.textContent = todoText;
      todoSubmit.innerText = "Add Todo"; // Reset button text
      editMode = false;
      editItem = null;
    } else {
      // CREATE: Otherwise, add a brand new task to the list
      addTodoItem(todoText);
    }
    todoInput.value = ""; // Clear the input field after success
  });

  // --- 4. Event Delegation for List Actions ---
  // We attach one listener to the parent (ul) to handle clicks on all buttons (delete/edit)
  todoList.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a button
    if (target.tagName === "BUTTON") {
      const todoItem = target.parentNode; // The <li> containing the buttons

      // Delete Logic
      if (target.innerText === "❌") {
        todoItem.remove();
      }
      // Edit Setup Logic
      else if (target.innerText === "✏️") {
        editMode = true;
        editItem = todoItem;
        todoSubmit.innerText = "Edit Todo"; // Change form button to reflect edit mode
        todoInput.value = todoItem.firstChild.textContent; // Populate input with current text
        todoInput.focus(); // Place cursor in the input automatically
      }
    }
  });

  // --- 5. Helper Function: Create Task Element ---
  function addTodoItem(todoText) {
    // Create the parent list item
    const todoItem = document.createElement("li");

    // Create buttons
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    // Structure the content
    todoItem.innerHTML = `<span>${todoText}</span>`;
    editButton.innerText = "✏️";
    removeButton.innerText = "❌";

    // Append buttons to the list item
    todoItem.appendChild(editButton);
    todoItem.appendChild(removeButton);

    // Finally, add the list item to the main Todo List (UL)
    todoList.appendChild(todoItem);
  }
});
