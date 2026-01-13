'use strict'

export let users = [];
export let tasks = [];

// Load Users
export async function loadUsers() {
    const savedUser = localStorage.getItem('users');
    if (savedUser) {
        users = JSON.parse(savedUser);
        return users;
    }
    const res = await fetch('./JSON/users.json');
    users = await res.json();
    localStorage.setItem('users', JSON.stringify(users));
    return users;
};

// Get Users
export function getUsers() {
    return users;
};

// Add User
export function addUser(user) {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

// ---------------- TASKS --------------------

let currentUserId = null;

// Add Task
export function addTask(task) {
    tasks.push(task);

    // Use the user ID from the task or the loaded user context
    const uid = task.userId || currentUserId;
    if (uid) {
        localStorage.setItem(`tasks_${uid}`, JSON.stringify(tasks));
    } else {
        console.error("No user ID found for saving task");
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Load Task
export function loadTasks(userID) {
    currentUserId = userID; // Track current user
    if (!userID) return [];

    const saved = localStorage.getItem(`tasks_${userID}`)
    tasks = saved ? JSON.parse(saved) : [];
    return tasks;
}

// filtre: This function is clave for that the filtres of the other files
// get always the list of task updated of the active user
export function getTasks() {
    return tasks;
}

// Function for update the status
export function updateTaskStatus(taskId, newStatus) {
    // We update the status in the arrat of memory
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
    );

    // Save in LocalStorage for the persinstance of recharge the page
    if (currentUserId) {
        localStorage.setItem(`tasks_${currentUserId}`, JSON.stringify(tasks));
    } else {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

export function deleteTask(taskId) {
    // Ensure tasks is an array
    if (!Array.isArray(tasks)) {
        console.error("Tasks is not an array");
        return;
    }

    // Filter out the task with the given ID
    tasks = tasks.filter(task => task.id !== taskId);

    // Update localStorage
    if (currentUserId) {
        localStorage.setItem(`tasks_${currentUserId}`, JSON.stringify(tasks));
    } else {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

export function deleteAllTasks() {
    tasks = [];
    if (currentUserId) {
        localStorage.setItem(`tasks_${currentUserId}`, JSON.stringify(tasks));
    } else {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}