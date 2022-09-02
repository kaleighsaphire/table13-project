const deleteBtn = document.querySelectorAll(".del")
const todoItem = document.querySelectorAll("span.not")
const todoComplete = document.querySelectorAll("span.completed")
const starIcon = document.querySelectorAll("span.regular")
const starImportant = document.querySelectorAll("span.important")

//add variable to have date added to todos.ejs this part may not be necessary -Cory
const todoDateAdded = document.querySelectorAll("span.date")

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteTodo)
})

Array.from(todoItem).forEach((el) => {
  el.addEventListener("click", markComplete)
})

Array.from(todoComplete).forEach((el) => {
  el.addEventListener("click", markIncomplete)
})

Array.from(starIcon).forEach((el) => {
  el.addEventListener("click", markImportant)
})

Array.from(starImportant).forEach((el) => {
  el.addEventListener("click", markRegular)
})

async function deleteTodo() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch("todos/deleteTodo", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch("todos/markComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch("todos/markIncomplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}
// Highlight todo item star
async function markImportant() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch("todos/markImportant", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function markRegular() {
  const todoId = this.parentNode.dataset.id
  try {
    const response = await fetch("todos/markRegular", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}
