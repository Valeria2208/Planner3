window.onload = function(){

  // ===== USER DATA =====
  let name = localStorage.getItem("studentName")
  let surname = localStorage.getItem("studentSurname")
  let age = localStorage.getItem("studentAge")
  let grade = localStorage.getItem("studentClass")
  let photo = localStorage.getItem("studentPhoto")

  // NAME
  if(name){
    document.getElementById("name").innerText = name + " " + (surname || "")
  }

  // AGE
  if(age){
    document.getElementById("age").innerText = age
  }

  // GRADE
  if(grade){
    document.getElementById("grade").innerText = grade
  }

  // PHOTO
  if(photo){
    let big = document.getElementById("avatar")
    if(big) big.src = photo

    let small = document.getElementById("avatarSmall")
    if(small) small.src = photo
  }

}

// ===== TASKS =====
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  const task = document.createElement("div");
  task.className = "task";

  task.innerHTML = `
    <span onclick="toggleTask(this)">⬜ ${text}</span>
    <button onclick="deleteItem(this)">❌</button>
  `;

  document.getElementById("taskList").appendChild(task);
  input.value = "";
}

// отметить выполненным
function toggleTask(el) {
  if (el.innerHTML.includes("⬜")) {
    el.innerHTML = el.innerHTML.replace("⬜", "✔");
    el.style.color = "green";
  } else {
    el.innerHTML = el.innerHTML.replace("✔", "⬜");
    el.style.color = "black";
  }
}

// удалить
function deleteItem(btn) {
  btn.parentElement.remove();
}

// ===== NOTES =====
function addNote() {
  const text = document.getElementById("noteInput").value.trim();
  const color = document.getElementById("colorSelect").value;

  if (text === "") return;

  const note = document.createElement("div");
  note.className = "note " + color;

  note.innerHTML = `
    ${text}
    <br>
    <button onclick="deleteItem(this)">❌</button>
  `;

  document.getElementById("notesList").appendChild(note);

  document.getElementById("noteInput").value = "";
}

// ===== SCHEDULE AUTO =====
function loadSchedule() {
  const today = new Date().getDay(); 
  // 0 = воскресенье, 6 = суббота

  const scheduleBox = document.querySelector(".box:first-child");

  if (today === 0 || today === 6) {
    // выходные
    scheduleBox.innerHTML = `
      <h4>Schedule</h4>
      <p style="padding:10px;">🎉 Weekend — no classes!</p>
    `;
  } else {
    // будни
    scheduleBox.innerHTML = `
      <h4>Schedule for today</h4>
      <div class="item">10:00 — Math</div>
      <div class="item">11:30 — History</div>
      <div class="item">13:00 — English</div>
      <div class="item">15:00 — Physics</div>
    `;
  }
}

// запуск при загрузке страницы
loadSchedule();