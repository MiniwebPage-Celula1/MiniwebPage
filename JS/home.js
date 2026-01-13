'use strict';
import { getTasks, loadTasks } from './data.js';
import { renderTasks, createTaskLogic, deleteTaskLogic, deleteAllTasksLogic } from './crud.js';

// ================================
// INIT
// ================================
const loggedUser = localStorage.getItem('loggedUser');

if (!loggedUser) {
    window.location.href = 'index.html';
} else {
    initApp();
}

async function initApp() {
    const user = JSON.parse(loggedUser);
    const userId = user.id;

    // 1. Display User Name
    const activeUserElement = document.getElementById('activeUser');
    if (activeUserElement) {
        activeUserElement.textContent = user.name || 'User';
    }

    // 2. UI Selectors
    const addTaskButton = document.getElementById('addTaskButton');
    const createTaskCard = document.getElementById('createTaskCard');
    const exitButton = document.getElementById('submitExit'); 
    const exitFilterButton = document.getElementById('submitExitFilter'); 
    const backgroundForm = document.getElementById('backgroundForm');
    const filterTaskCard = document.getElementById('filterTaskCard');
    const filterTaskButton = document.getElementById('filterTaskButton');
    const alertDeleteAll = document.getElementById('alertDeleteAllCard');
    const deleteAllButton = document.getElementById('deleteAllButton');
    const noButton = document.getElementById('noButton');

    // Additional Selectors
    const createTaskForm = document.getElementById('createTaskForm');
    const titleInput = document.getElementById('taskTitleInput');
    const descInput = document.getElementById('taskDescriptionInput');
    const prioritySelect = document.getElementById('taskPrioritySelect');
    const taskContainer = document.querySelector('.cardsTask');
    const confirmDeleteAllButton = document.getElementById('confirmDeleteAllButton');

    // filtre: Selectors for the functionality of the filtering
    const filterTaskForm = document.getElementById('filterTaskForm');
    const filterPrioritySelect = document.getElementById('filterPrioritySelect');
    const filterStatusSelect = document.getElementById('filterStatusSelect');
    const inputTaskSearch = document.getElementById('inputTaskSearch');

    // 3. HELPER: Close All Cards
    function closeAllCards() {
        if (createTaskCard) createTaskCard.style.display = 'none';
        if (filterTaskCard) filterTaskCard.style.display = 'none';
        if (alertDeleteAll) alertDeleteAll.style.display = 'none';
        if (backgroundForm) backgroundForm.style.display = 'none';
    }

    // 4. EVENT LISTENERS (UI)
    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            closeAllCards();
            createTaskCard.style.display = 'block';
            backgroundForm.style.display = 'block';
        });
    }

    if (filterTaskButton) {
        filterTaskButton.addEventListener('click', () => {
            closeAllCards();
            filterTaskCard.style.display = 'block';
            backgroundForm.style.display = 'block';
        });
    }

    if (deleteAllButton) {
        deleteAllButton.addEventListener('click', () => {
            closeAllCards();
            alertDeleteAll.style.display = 'block';
            backgroundForm.style.display = 'block';
        });
    }

    if (exitButton) {
        exitButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllCards();
        });
    }

    if (exitFilterButton) {
        exitFilterButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllCards();
        });
    }

    if (noButton) {
        noButton.addEventListener('click', () => {
            closeAllCards();
        });
    }

    if (backgroundForm) {
        backgroundForm.addEventListener('click', () => {
            closeAllCards();
        });
    }

    // filtre: Logical of the form of filtre (Categories)
    if (filterTaskForm) {
        filterTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedPriority = filterPrioritySelect.value;
            const selectedStatus = filterStatusSelect.value;

            const filtered = getTasks().filter(task => {
                const matchesPriority = selectedPriority === "" || task.priority === selectedPriority;
                const matchesStatus = selectedStatus === "" || task.status === selectedStatus;
                return matchesPriority && matchesStatus;
            });

            renderTasks(filtered); // We sent the array filtered at CRUD
            closeAllCards();
        });
    }

    // filtre: Logical for the bar of searching of the text
    if (inputTaskSearch) {
        inputTaskSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = getTasks().filter(task => 
                task.title.toLowerCase().includes(query) || 
                task.description.toLowerCase().includes(query)
            );
            renderTasks(filtered);
        });
    }
    // filtre: Lógica para el botón de confirmar eliminación masiva
    if (confirmDeleteAllButton) {
        confirmDeleteAllButton.addEventListener('click', () => {
            deleteAllTasksLogic(); // Llama a la función en crud.js
            closeAllCards();       // Cierra el modal de advertencia
        });
    }
    // SUBMIT CREATE TASK
    if (createTaskForm) {
        createTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = titleInput.value.trim();
            const description = descInput.value.trim();
            const priority = prioritySelect.value;

            const success = createTaskLogic(userId, title, description, priority);
            if (success) {
                createTaskForm.reset();
                closeAllCards();
            }
        });
    }

    // DYNAMIC EVENTS (Delete/Edit)
    if (taskContainer) {
        taskContainer.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            if (button.classList.contains('deleteCardTask')) {
                const id = Number(button.dataset.id);
                deleteTaskLogic(id);
            }

            if (button.classList.contains('editCard')) {
                alert('Edit logic pending');
            }
        });
    }

    // LOGOUT
    const logOutButton = document.getElementById('logOutButton');
    if (logOutButton) {
        logOutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedUser');
            window.location.href = 'index.html';
        });
    }

    // 5. Load Data & Render
    try {
        await loadTasks(userId);
        renderTasks();
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}