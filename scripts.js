const form = document.querySelector('#form')
const input = document.querySelector('#input')
const todosUL = document.querySelector('#todos')

// Local storage
const todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
    todos.forEach(todo => addTodo(todo))
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li')
        const delBtn = document.createElement('span')
        delBtn.innerHTML = "X"

        if (todo && todo.completed) {
            todoEl.classList.add('completed')
            delBtn.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            delBtn.classList.toggle('completed')
            updateLS()
        })

        delBtn.addEventListener('click', (e) => {
          e.preventDefault()

          todoEl.remove()
          delBtn.remove()
          updateLS()
        })

        todosUL.appendChild(todoEl)
        todosUL.appendChild(delBtn)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li')
    const delBtns = document.querySelectorAll('span')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))  
}

