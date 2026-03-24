document.addEventListener("DOMContentLoaded", () => {

  const avatar = document.getElementById("avatar")
  const savedAvatar = localStorage.getItem("avatar")

  if (savedAvatar) {
    avatar.src = savedAvatar
  } else {
    avatar.src = "https://via.placeholder.com/40"
  }

  showDay("mon")
})


// ===== ДОБАВЛЕНИЕ =====
function addTask() {

  const input = document.getElementById("taskInput")
  const day = document.getElementById("daySelect").value
  const category = document.getElementById("categorySelect").value

  const text = input.value.trim()

  if (!text) {
    alert("Введите задачу")
    return
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []

  tasks.push({
    text: text,
    day: day,
    category: category
  })

  localStorage.setItem("tasks", JSON.stringify(tasks))

  input.value = ""

  showDay(day)
}


// ===== ПОКАЗ ДНЯ =====
function showDay(day) {

  const container = document.getElementById("scheduleContent")

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []

  const filtered = tasks.filter(t => t.day === day)

  container.innerHTML = ""

  if (filtered.length === 0) {
    container.innerHTML = "<p>No tasks</p>"
    return
  }

filtered.forEach((task, index) => {

  let color = ""

  if (task.category === "study") color = "#2F80ED"
  if (task.category === "exam") color = "#EB5757"
  if (task.category === "project") color = "#27AE60"
  if (task.category === "personal") color = "#F2C94C"

  const div = document.createElement("div")

  div.style.padding = "12px"
  div.style.margin = "10px 0"
  div.style.background = color
  div.style.color = "#fff"
  div.style.borderRadius = "10px"
  div.style.display = "flex"
  div.style.justifyContent = "space-between"
  div.style.alignItems = "center"
  div.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)"

  div.innerHTML = `
    <span>${task.text} (${task.category})</span>
    <button onclick="deleteTask(${index})" style="border:none; background:none; color:white; cursor:pointer;">❌</button>
  `

  container.appendChild(div)
})
}


// ===== УДАЛЕНИЕ =====
function deleteTask(index) {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []

  tasks.splice(index, 1)

  localStorage.setItem("tasks", JSON.stringify(tasks))

  showDay("mon")
}

