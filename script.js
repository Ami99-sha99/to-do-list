// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const themeSelectors = document.querySelectorAll(".theme-selector div");
const dateTimeDisplay = document.getElementById("datetime");

// Load saved tasks and theme on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update time every second

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.className = savedTheme; // Set saved theme
    }
});

// Event listeners
todoButton.addEventListener("click", addTodo);
themeSelectors.forEach(selector => {
    selector.addEventListener("click", changeTheme);
});

// Add todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        alert("Please enter a task!");
        return;
    }

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    checkButton.onclick = () => newTodo.classList.toggle("completed");
    todoDiv.appendChild(checkButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => {
        todoList.removeChild(todoDiv);
        removeTaskFromLocal(todoText);
    };
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    saveTaskToLocal(todoText);
    todoInput.value = ""; // Clear input
}

// Save task to local storage
function saveTaskToLocal(todo) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(todo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        checkButton.onclick = () => newTodo.classList.toggle("completed");
        todoDiv.appendChild(checkButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => {
            todoList.removeChild(todoDiv);
            removeTaskFromLocal(todo);
        };
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
}

// Remove task from local storage
function removeTaskFromLocal(todo) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== todo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Change theme
function changeTheme(e) {
    const theme = e.target.getAttribute("data-theme");
    document.body.className = ""; // Clear existing theme classes
    document.body.classList.add(theme); // Add the selected theme class
    localStorage.setItem("theme", theme); // Save the theme in local storage
}

// Update date and time
function updateDateTime() {
    dateTimeDisplay.innerText = new Date().toLocaleString();
}
