let input = document.getElementById("taskInput");
let button = document.getElementById("addBtn");
let list = document.getElementById("taskList");

// Load saved tasks
window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
};

// Add task on button click
button.onclick = addTask;

// Add task on Enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Enter a task!");
    return;
  }

  createTask(taskText, false);
  saveTasks();
  input.value = "";
}

function createTask(text, completed) {
  let li = document.createElement("li");

  li.textContent = text;
  if (completed) li.classList.add("completed");

  // Toggle complete
  li.onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
  };

  // Delete button
  let delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("delete-btn");

  delBtn.onclick = function (e) {
    e.stopPropagation(); // prevent toggle
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

// Save to localStorage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}