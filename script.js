
// load todo on page load
// function hoisting
window.onload = function () {
  loadTodos();
};
// addTodo
function addTodo() {
  const input = document.getElementById("todo-input"); // input => input element
  const todoText = input.value.trim();

  if (todoText === "") return;
  // console.log(todos);
  // todo => text | isCompleted

  const todo = {
    text: todoText,
    isCompleted: false,
  };

  let todos = getTodo();
  todos.push(todo);
  saveTodo(todos);
  input.value = "";
  renderTodos();
}

// local storage
// getTodo
function getTodo() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

// saveTodo
function saveTodo(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// deleteTodo
function deleteTodo(index) {
  const todos = getTodo(); // splice
  todos.splice(index, 1);
  saveTodo(todos);
  renderTodos();
}

// toggleTodo
function toggleTodo(index) {
  let todos = getTodo();
  // console.log(todos[index]);
  console.log(document.getElementsByClassName("completed"));
  todos[index].isCompleted = !todos[index].isCompleted;
  saveTodo(todos);
  renderTodos();
}

// renderTodo
function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  const todos = getTodo();
  // forEach => loop over an array | for normal arrays
  // map => loop over an array | DOM | react | UI
  todos.map((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.isCompleted ? "completed" : "";

    li.innerHTML = `
    <span onclick="toggleTodo(${index})">${todo.text}</span>
    <button class="delete-btn" onclick="deleteTodo(${index})">X</button>
    `;
    todoList.appendChild(li);
  });
}
// loadTodos
function loadTodos() {
  renderTodos();
}