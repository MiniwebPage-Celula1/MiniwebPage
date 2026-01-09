'use strict';
import { addTask, getTasks, deleteTask, deleteAllTasks } from './data.js';

// Container
const taskContainer = document.querySelector('.cardsTask');

// ================================
// CRUD OPERATIONS
// ================================

/**
 * Handles the logic for creating a new task.
 * @param {string} userId - The ID of the current user.
 * @param {string} title - Task title.
 * @param {string} description - Task description.
 * @param {string} priority - Task priority.
 * @returns {boolean} - Returns true if successful, false if validation failed.
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
 * @param {number} taskId 
 */
export function deleteTaskLogic(taskId) {
    if (confirm("Delete this task?")) {
        deleteTask(taskId);
        renderTasks(); // Re-render to update UI (removes element)
    }
}

/**
 * Handles the logic for deleting all tasks.
 */
export function deleteAllTasksLogic() {
    // No confirm needed here as the UI modal already asks for it
    deleteAllTasks();
    renderTasks();
}


/**
 * Renders all tasks to the DOM.
 */
const template = document.getElementById('taskCardTemplate');

export function renderTasks() {
    if (!taskContainer) return;

    const tasks = getTasks();
    taskContainer.innerHTML = '';

    if (!tasks || tasks.length === 0) {
        taskContainer.innerHTML = '<p style="color:white; text-align:center;">No tasks yet. Add one!</p>';
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
        if (statusSelect) statusSelect.value = task.status;

        taskContainer.appendChild(card);
    });
}
