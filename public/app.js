const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskCount = document.getElementById('task-count');
const completedCount = document.getElementById('completed-count');

async function loadTasks() {
  try {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error('Failed to load tasks:', err);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = '';

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;

  taskCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
  completedCount.textContent = `${done} completed`;

  if (total === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.done ? 'done' : ''}`;
    li.dataset.id = task.id;

    const content = document.createElement('div');
    content.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'task-title';
    span.textContent = task.title;

    content.appendChild(checkbox);
    content.appendChild(span);
    content.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
        toggleTask(task.id);
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.appendChild(content);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

async function addTask(title) {
  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (res.ok) {
      taskInput.value = '';
      loadTasks();
    }
  } catch (err) {
    console.error('Failed to add task:', err);
  }
}

async function toggleTask(id) {
  try {
    const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
    if (res.ok) {
      loadTasks();
    }
  } catch (err) {
    console.error('Failed to toggle task:', err);
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadTasks();
    }
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (title) {
    addTask(title);
  }
});

// Initial load
loadTasks();
