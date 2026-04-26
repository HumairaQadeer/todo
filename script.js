let input = document.getElementById("taskInput");
let button = document.getElementById("addBtn");
let list = document.getElementById("taskList");

// Load tasks
window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
};

// Add task
button.onclick = addTask;

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  let text = input.value.trim();
  if (text === "") return alert("Enter a task!");

  createTask(text, false);
  saveTasks();
  input.value = "";
}

// Create task
function createTask(text, completed) {
  let li = document.createElement("li");

  let span = document.createElement("span");
  span.textContent = text;

  if (completed) li.classList.add("completed");

  // Toggle complete
  span.onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
  };

  // Delete button
  let delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";

  delBtn.onclick = function () {
    li.remove();
    saveTasks();
  };

  // Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  editBtn.onclick = function () {
    let newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText;
      saveTasks();
    }
  };

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  list.appendChild(li);
}

// Save tasks
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter tasks
function filterTasks(type) {
  let items = document.querySelectorAll("li");

  items.forEach(li => {
    switch (type) {
      case "all":
        li.style.display = "flex";
        break;
      case "completed":
        li.style.display = li.classList.contains("completed") ? "flex" : "none";
        break;
      case "pending":
        li.style.display = !li.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}

// Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
