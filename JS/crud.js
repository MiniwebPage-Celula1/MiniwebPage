'use strict';

import { addTask, getTasks, deleteTask, deleteAllTasks, updateTaskStatus } from './data.js';

// Container
const taskContainer = document.querySelector('.cardsTask');

// ================================
// CRUD OPERATIONS
// ================================

/**
 * Handles the logic for creating a new task.
 */
export function createTaskLogic(userId, title, description, priority) {
    if (!title) {
        alert('Title is required');
        return false;
    }

    const newTask = {
        id: Date.now(),
        userId,
        title,
        description,
        priority,
        status: 'pending'
    };

    addTask(newTask);
    renderTasks();
    return true;
}

/**
 * Deletes a task by ID and refreshes the UI.
 */
export function deleteTaskLogic(taskId) {
    if (confirm("Delete this task?")) {
        deleteTask(taskId);
        renderTasks(); 
    }
}

/**
 * Handles the logic for deleting all tasks.
 */
export function deleteAllTasksLogic() {
    deleteAllTasks();
    renderTasks();
}


/**
 * Renders all tasks to the DOM.
 */
const template = document.getElementById('taskCardTemplate');

// Filtre: it Add the parameter 'filteredTasks' for can renderize specific results 
export function renderTasks(filteredTasks = null) {
    if (!taskContainer) return;

    // Filtre: If filteredTasks have content, we used that; if not, We obtained all the tasks.
    const tasks = filteredTasks ? filteredTasks : getTasks();
    taskContainer.innerHTML = '';

    if (!tasks || tasks.length === 0) {
        taskContainer.innerHTML = '<p style="color:white; text-align:center;">No tasks found.</p>';
        return;
    }

    if (!template) {
        console.error("Template not found");
        return;
    }

    tasks.forEach(task => {
        const card = template.cloneNode(true);
        card.removeAttribute('id');
        card.style.display = 'block';
        card.dataset.id = task.id;

        // Content
        const titleEl = card.querySelector('.taskTitle');
        if (titleEl) titleEl.textContent = task.title;

        const descEl = card.querySelector('.taskDescription');
        if (descEl) descEl.textContent = task.description || '';

        const prioEl = card.querySelector('.taskPriorityText');
        if (prioEl) prioEl.textContent = task.priority;

        // Buttons
        const deleteBtn = card.querySelector('.deleteCardTask');
        if (deleteBtn) deleteBtn.dataset.id = task.id;

        const editBtn = card.querySelector('.editCard');
        if (editBtn) editBtn.dataset.id = task.id;

        // Status
        const statusSelect = card.querySelector('.taskStatusSelect');
        if (statusSelect) {
            statusSelect.value = task.status;
            
            // Listen the change and save in data.js
            statusSelect.addEventListener('change', (e) => {
                updateTaskStatus(task.id, e.target.value);
            });
        }

        taskContainer.appendChild(card);
    });
}