const app = document.querySelector('#app')
const input = app.querySelector('#task-input')
const addButton = app.querySelector('#add-button')
const list = app.querySelector('#list')
const itemTemplate = list.querySelector('template')

// CARREGAR TASKS
async function loadTasks() {
  list.querySelectorAll('li').forEach(li => li.remove())

  const response = await fetch('/tasks')

  const tasks = await response.json()

  tasks.forEach(task => {
    const element = createDomTask(task)

    list.appendChild(element)
  })
}

// CRIAR ELEMENTO
function createDomTask(task) {
  const element =
    itemTemplate.content.cloneNode(true)

  element.querySelector('.title')
    .textContent = task.title

  element.querySelector('.bt-delete')
    .addEventListener('click', async () => {

      await fetch(`/tasks/${task.id}`, {
        method: 'DELETE'
      })

      loadTasks()
    })

  return element
}

// ADICIONAR TASK
async function createNewTask() {
  const title = input.value.trim()

  if (!title) return

  await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  })

  input.value = ''

  loadTasks()
}

addButton.addEventListener(
  'click',
  createNewTask
)

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    createNewTask()
  }
})

loadTasks()