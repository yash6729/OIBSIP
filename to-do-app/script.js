function getCurrentTime() {
    return new Date().toLocaleString();
}

function addTask() {
    let taskText = document.getElementById("taskInput").value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let time = getCurrentTime();
    createTask(taskText, time);

    document.getElementById("taskInput").value = "";
}

function createTask(taskText, createdAt, isCompleted = false) {
    let li = document.createElement("li");

    let text = document.createElement("span");
    text.textContent = taskText;

    let timeInfo = document.createElement("div");
    timeInfo.className = "time";
    timeInfo.textContent = "Added: " + createdAt;

    let status = document.createElement("div");
    if (isCompleted) {
        status.className = "completed";
        status.textContent = "✔ Completed";
    }

    let btnContainer = document.createElement("div");
    btnContainer.className = "task-buttons";

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = function () {
        let newTask = prompt("Edit task:", text.textContent);
        if (newTask) text.textContent = newTask;
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
        li.remove();
    };

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = function () {
        status.className = "completed";
        status.textContent = "✔ Completed";
        completeBtn.remove();
    };

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    if (!isCompleted) btnContainer.appendChild(completeBtn);

    li.appendChild(text);
    li.appendChild(timeInfo);
    li.appendChild(status);
    li.appendChild(btnContainer);

    document.getElementById("taskList").appendChild(li);
}