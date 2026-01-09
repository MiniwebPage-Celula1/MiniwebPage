const addTaskButton = document.getElementById('addTaskButton');
const createTaskCard = document.getElementById('createTaskCard');
const exitButton = document.getElementById('submitExit');
const backgroundForm = document.getElementById('backgroundForm');
const filterTaskCard = document.getElementById('filterTaskCard');
const filterTaskButton = document.getElementById('filterTaskButton');


addTaskButton.addEventListener('click', () => {
    createTaskCard.style.display = 'block';
        backgroundForm.style.display = 'block';
        
});

filterTaskButton.addEventListener('click', () =>{
    filterTaskCard.style.display = 'block';
})
exitButton.addEventListener('click', () => {
    createTaskCard.style.display = 'none';
    backgroundForm.style.display = 'none';
});




