// BOTONES PRINCIPALES
const addTaskButton = document.getElementById('addTaskButton');
const filterTaskButton = document.getElementById('filterTaskButton');
const deleteAllButton = document.getElementById('deleteAllButton');
const deleteTaskButton = document.getElementById('deleteTaskButton');
// FORMULARIOS / TARJETAS
const createTaskCard = document.getElementById('createTaskCard');
const filterTaskCard = document.getElementById('filterTaskCard');

// BOTONES DE CIERRE / EXIT
const exitButton = document.getElementById('buttontExitTask');
const exitFilterButton = document.getElementById('exitFilterButton');
const backgroundForm = document.getElementById('backgroundForm');

// ALERTAS / CONFIRMACIONES
const alertDeleteAll = document.getElementById('alertDeleteAllCard');
const alertTaskProcess = document.getElementById('alertTaskProcess');
const alertTaskDelete = document.getElementById('alertTaskDelete');

// BOTONES DE CONFIRMACIÓN / CANCELACIÓN
const yesTaskButton = document.getElementById('yesTaskButton');
const noTaskButton = document.getElementById('noTaskButton');
const yesTaskDeleteButton = document.getElementById('yesTaskDeleteButton');
const noTaskDeleteButton = document.getElementById('noTaskDeleteButton');
const noButton = document.getElementById('noButton');




function closeAllCards() {
    createTaskCard.style.display = 'none';
    filterTaskCard.style.display = 'none';
    alertDeleteAll.style.display = 'none';
    alertTaskProcess.style.display = 'none';
    alertTaskDelete.style.display = 'none';
    backgroundForm.style.display = 'none';
}

addTaskButton.addEventListener('click', () => {
    closeAllCards();
    createTaskCard.style.display = 'block';
    backgroundForm.style.display = 'block';
});

filterTaskButton.addEventListener('click', () => {
    closeAllCards();
    filterTaskCard.style.display = 'block';
    backgroundForm.style.display = 'block';
});

deleteAllButton.addEventListener('click', () =>{
    closeAllCards();
    alertDeleteAll.style.display = 'block';
    backgroundForm.style.display = 'block';
})
exitButton.addEventListener('click', (e) => {
    e.preventDefault();
    alertTaskProcess.style.display = 'block';

});

noButton.addEventListener('click', () =>{
    closeAllCards();
})
backgroundForm.addEventListener('click', () => {
    closeAllCards();
});

noTaskButton.addEventListener('click', () => {
    alertTaskProcess.style.display = 'none';
    createTaskCard.style.display = 'block';
    backgroundForm.style.display = 'block';
    console.log(noTaskButton)
});

yesTaskButton.addEventListener('click', () =>{
    closeAllCards();
    console.log(yesTaskButton)
})

deleteTaskButton.addEventListener('click', () =>{
    alertTaskDelete.style.display = 'block'
    backgroundForm.style.display = 'block'
})


noTaskDeleteButton.addEventListener('click', () =>{
    closeAllCards();
})