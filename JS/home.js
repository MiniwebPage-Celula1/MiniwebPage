const cardsContainer = document.getElementById('cardsTaskContainer');
const backgroundForm = document.getElementById('backgroundForm');

const createTaskCard = document.getElementById('createTaskCard');
const filterTaskCard = document.getElementById('filterTaskCard');
const alertDeleteAll = document.getElementById('alertDeleteAllCard');

const addTaskButton = document.getElementById('addTaskButton');
const filterTaskButton = document.getElementById('filterTaskButton');
const deleteAllButton = document.getElementById('deleteAllButton');

const createForm = document.getElementById('createTaskForm');
const filterForm = document.getElementById('filterTaskForm');

const searchInput = document.getElementById('inputTaskSearch');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filteredTasks = [...tasks];

/* ================== STORAGE ================== */
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* ================== UI ================== */
function closeAll() {
  createTaskCard.style.display = 'none';
  filterTaskCard.style.display = 'none';
  alertDeleteAll.style.display = 'none';
  backgroundForm.style.display = 'none';
}

function show(el) {
  closeAll();
  el.style.display = 'block';
  backgroundForm.style.display = 'block';
}

function getPriorityStyles(priority) {
  if (priority === 'high') {
    return 'background: rgba(255,0,0,0.25); border: 2px solid red; color: red;';
  }
  if (priority === 'medium') {
    return 'background: rgba(255,255,0,0.3); border: 2px solid #d4aa00; color: #b58b00;';
  }
  if (priority === 'low') {
    return 'background: rgba(0,128,0,0.25); border: 2px solid green; color: green;';
  }
  return '';
}

/* ================== RENDER ================== */
function renderTasks(list = tasks) {
  cardsContainer.innerHTML = '';

  list.forEach((task, index) => {
    cardsContainer.innerHTML += `
      <div class="cardTaskCreate">
        <div class="text">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
        </div>

        <article class="status">
          <div class="butttonsInterative">
            <button class="deleteCardTask" data-index="${index}">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>

          <div class="priority" style="${getPriorityStyles(task.priority)}">
            ${task.priority.toUpperCase()}
          </div>

          <select data-index="${index}" class="statusSelect">
            <option ${task.status === 'pending' ? 'selected' : ''}>pending</option>
            <option ${task.status === 'In progress' ? 'selected' : ''}>In progress</option>
            <option ${task.status === 'done' ? 'selected' : ''}>done</option>
          </select>
        </article>
      </div>
    `;
  });
}

/* ================== SEARCH ================== */
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();

  const searched = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(value) ||
    task.description.toLowerCase().includes(value)
  );

  renderTasks(searched);
});

/* ================== EVENTS ================== */
addTaskButton.onclick = () => show(createTaskCard);
filterTaskButton.onclick = () => show(filterTaskCard);
deleteAllButton.onclick = () => show(alertDeleteAll);
backgroundForm.onclick = closeAll;

createForm.onsubmit = e => {
  e.preventDefault();

  const newTask = {
    title: taskTitleInput.value,
    description: taskDescriptionInput.value,
    priority: taskPrioritySelect.value,
    status: taskStatusSelectForm.value
  };

  tasks.push(newTask);
  filteredTasks = [...tasks];

  saveTasks();
  createForm.reset();
  closeAll();
  renderTasks(filteredTasks);
};

filterForm.onsubmit = e => {
  e.preventDefault();

  const p = filterPrioritySelect.value;
  const s = filterStatusSelect.value;

  filteredTasks = tasks.filter(task =>
    (!p || task.priority === p) &&
    (!s || task.status === s)
  );

  renderTasks(filteredTasks);
};

cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.deleteCardTask')) {
    const i = e.target.closest('.deleteCardTask').dataset.index;
    tasks.splice(i, 1);
    filteredTasks = [...tasks];
    saveTasks();
    renderTasks(filteredTasks);
  }
});

document.getElementById('yesButton').onclick = () => {
  tasks = [];
  filteredTasks = [];
  saveTasks();
  renderTasks();
  closeAll();
};

document.getElementById('noButton').onclick = closeAll;
document.getElementById('submitExitFilter').onclick = closeAll;
document.getElementById('buttontExitTask').onclick = closeAll;

/* ================== INIT ================== */
renderTasks(filteredTasks);
