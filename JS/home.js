'use strict';
import { loadTasks } from './data.js';
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

    // 2. UI Selectors (MOVED UP)
    const addTaskButton = document.getElementById('addTaskButton');
    const createTaskCard = document.getElementById('createTaskCard');
    const exitButton = document.getElementById('submitExit'); // Create Task Exit
    const exitFilterButton = document.getElementById('submitExitFilter'); // Filter Task Exit
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

    // 3. HELPER: Close All Cards
    function closeAllCards() {
        if (createTaskCard) createTaskCard.style.display = 'none';
        if (filterTaskCard) filterTaskCard.style.display = 'none';
        if (alertDeleteAll) alertDeleteAll.style.display = 'none';
        if (backgroundForm) backgroundForm.style.display = 'none';
    }

    // 4. EVENT LISTENERS (UI) - Setup immediately
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

    // Confirm Delete All Button Logic - Logic Removed as requested by user
    /*
    if (confirmDeleteAllButton) {
        confirmDeleteAllButton.addEventListener('click', () => {
            deleteAllTasksLogic();
            closeAllCards();
        });
    }
    */

    // SUBMIT CREATE TASK
    if (createTaskForm) {
        createTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = titleInput.value.trim();
            const description = descInput.value.trim();
            const priority = prioritySelect.value;

            // Delegate LOGIC to crud.js
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

            // DELETE INDIVIDUAL TASK
            if (button.classList.contains('deleteCardTask')) {
                const id = Number(button.dataset.id);
                deleteTaskLogic(id);
            }

            // EDIT TASK
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

    // 5. Load Data & Render (Late binding)
    try {
        await loadTasks(userId);
        renderTasks();
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}
