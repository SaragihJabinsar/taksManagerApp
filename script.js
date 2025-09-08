const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between bg-white p-3 rounded shadow ${task.done ? 'opacity-60' : ''}`;
        li.innerHTML = `
        <span class='${task.done ? 'line-through' : ''}'>${task.text}</span>
        <div class='space-x-2'>
            <button onclick='toggleTask(${index})' class='text-green-500 hover:underline'>
                ${task.done ? '↩️ Undo' : '✔️ Done'}
            </button>
            <button onclick='deleteTask(${index})' class='text-red-500 hover:underline'>🗑️ Delete</button>
        </div>
        `;

        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, done: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }
});

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

renderTasks();