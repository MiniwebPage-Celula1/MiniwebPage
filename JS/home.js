const addTaskButton = document.getElementById('addTaskButton');
const createTaskCard = document.getElementById('createTaskCard');
const exitButton = document.getElementById('submitExit');
const backgroundForm = document.getElementById('backgroundForm');
const filterTaskCard = document.getElementById('filterTaskCard');
const filterTaskButton = document.getElementById('filterTaskButton');
const alertDeleteAll = document.getElementById('alertDeleteAllCard');
const deleteAllButton = document.getElementById('deleteAllButton');
const noButton = document.getElementById('noButton');

function closeAllCards() {
    createTaskCard.style.display = 'none';
    filterTaskCard.style.display = 'none';
    alertDeleteAll.style.display = 'none';
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
exitButton.addEventListener('click', () => {
    closeAllCards();
});
noButton.addEventListener('click', () =>{
    closeAllCards();
})
backgroundForm.addEventListener('click', () => {
    closeAllCards();
});






