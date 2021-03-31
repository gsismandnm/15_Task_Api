let users = []
let todoArray = []
const userSelect = document.getElementById('userSelect');
const todoList = document.getElementById('todoList');
const searchTodo = document.getElementById('search');


function userChange() {
    fillTodos(userSelect.value, searchTodo.innerText)
}
function searchChange(val) {
    fillTodos(userSelect.value, val)
}

function getUsers() {
    return new Promise((resolve, reject) => {
        resolve(
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(json => users = json));
    })
}

const fillUsers = () => {
    users.map(user => {
        const newOption = document.createElement('option');
        newOption.value = user.id;
        newOption.innerText = user.name;
        userSelect.appendChild(newOption)
    })
}

function getTodos() {
    return new Promise((resolve, reject) => {
        resolve(
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => response.json())
                .then(json => todoArray = json));
    })
}



const fillTodos = (userId, filter) => {
    todoList.innerHTML = ''
    const newTr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    th1.innerText = "User ID";
    th2.innerText = "Todo Title";
    newTr.appendChild(th1);
    newTr.appendChild(th2);
    todoList.appendChild(newTr)
    todoArray.map(todo => {
        if (((userId && todo.userId == userId) || !userId) && ((filter && todo.title.includes(filter)) || !filter)) {
            const newTr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            td1.innerText = users.find(u => u.id == todo.userId).name;
            td2.innerText = todo.title;
            newTr.appendChild(td1)
            newTr.appendChild(td2)
            todoList.appendChild(newTr)
        }
    })
}

getUsers()
    .then(() => fillUsers())

getTodos()
    .then(() => fillTodos())