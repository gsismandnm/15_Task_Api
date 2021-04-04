// SOLID Principles
// DRY --> Don't repeat yourself
// KISS --> Keep it simple/stupid
// YAGNI --> You ain't gonna need it. DELETE
// Uncle Bob --> if else kullanimini azaltin

const baseUrl = 'https://jsonplaceholder.typicode.com';
const selectElement = document.querySelector('#users');
const searcinput = document.querySelector('#search');
const todoBody = document.querySelector('#tbody');

let userTodos = [];
let searchStr = '';

const getUsers = () => {
    return axios.get(`${baseUrl}/users`);
}

const getUserTodos = async (userId) => {
    const todos = await axios.get(`${baseUrl}/todos?userId=${userId}`,
        {
            params: {
                _limit: 5,
                _start: 15
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authentication: 'some_token'
            }
        }
    );
    userTodos = todos.data;
    return todos;
}

const searchTodo = (str) => {
    const temp = userTodos.filter(item => item.title.includes(str) == true);

    makeList(temp);
}

const makeList = (data) => {
    todoBody.innerHTML = '';

    data.forEach(todo => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const td_2 = document.createElement('td');
        const button = document.createElement('button');

        td.innerHTML = (todo.completed) ? `<del>${todo.title}</del>` : todo.title;
        button.innerHTML = (todo.completed) ? 'done' : 'undone';
        button.className = (todo.completed) ? 'btn btn-success' : 'btn btn-warning';
        button.setAttribute('id', todo.id);
        button.addEventListener('click', (e) => {
            changeStatus(e.target.id);
        });

        td_2.appendChild(button)
        tr.appendChild(td);
        tr.appendChild(td_2);
        todoBody.appendChild(tr);
    });
}

const changeStatus = (id) => {
    const index = userTodos.findIndex(item => item.id == id);

    // if (userTodos[index].completed == true) {
    //     userTodos[index].completed = false
    // } else {
    //     userTodos[index].completed = true
    // }

    userTodos[index].completed = !userTodos[index].completed;

    if (searchStr == '') {
        makeList(userTodos);
    } else {
        searchTodo(searchStr);
    }
}

searcinput.addEventListener('input', (e) => {
    searchStr = e.target.value;
    searchTodo(e.target.value);
})

window.addEventListener('load', async () => {
    const { data } = await getUsers();

    data.forEach(user => {
        const opt = document.createElement('option');
        opt.value = user.id;
        opt.text = user.name;
        selectElement.add(opt);
    });
});

selectElement.addEventListener('change', async (e) => {
    const { data } = await getUserTodos(e.target.value);

    makeList(data);
});