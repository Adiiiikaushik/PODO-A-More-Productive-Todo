const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    let filteredTodos = todos;
    if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        
        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');

        if (todo.completed) {
            todoText.classList.add('completed');
        }

        todoText.textContent = todo.text;

        todoText.addEventListener('click', () => toggleComplete(todo.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';

        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
    });
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if(todoText !== ''){
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
}

function toggleComplete(id) {
    todos = todos.map(todo => {
        if(todo.id === id){
            todo.completed = !todo.completed;
        }
        return todo;

    });
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        const filter = e.target.dataset.filter;
        renderTodos(filter);
    });
});

renderTodos();
