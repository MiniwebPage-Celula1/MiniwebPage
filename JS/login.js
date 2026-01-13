import { loadUsers, addUser, getUsers } from './data.js'

await loadUsers();

let mode = 'Login'

const form = document.getElementById('loginform');
const inputUser = document.getElementById('inputUserName');
const inputPass = document.getElementById('inputPassword');

const toggleMode = document.getElementById('toggleMode');
const title = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('formMessage');


function updateFormUI(e) {

  if (mode === 'Login') {
    title.textContent = 'Login';
    submitBtn.textContent = 'Enter';
    toggleMode.textContent = 'Create one';
  } else {
    title.textContent = 'Register user';
    submitBtn.textContent = 'Create account';
    toggleMode.textContent = 'Already have an account';
  }
}

// Register/Login
toggleMode.addEventListener('click', (e) => {
  e.preventDefault()
  mode = mode === 'Login' ? 'Register' : 'Login';
  updateFormUI()
  clearMessage()
})


// Login user
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userName = inputUser.value.trim();
  const password = inputPass.value.trim();

  if (!userName || !password) {
    showMessage('Completa todos los campos');
    return;
  }

  if (mode === 'Login') {
    loginUser(userName, password);
  } else {
    registerUser(userName, password);
  }
});



function loginUser(userName, password) {
  const users = getUsers();
  const userFound = users.find(u => u.name === userName && u.password === password)

  if (!userFound) {
    showMessage('User not found')
    return;
  }

  localStorage.setItem('loggedUser', JSON.stringify(userFound))
  window.location.href = 'home.html'

}

function registerUser(userName, password) {
  const users = getUsers()
  const exist = users.find(u => u.name === userName);

  if (exist) {
    showMessage('There is already a user with the same name');
    return;
  }

  const newUser = {
    id: Date.now(),
    name: userName,
    password
  }

  mode = 'Login'
  addUser(newUser);
  updateFormUI();
  clearMessage()

}


function showMessage(text, type = 'error') {
  message.textContent = text;
  message.className = `form-message ${type}`;
}

function clearMessage() {
  message.textContent = '';
  message.className = 'form-message';
}

