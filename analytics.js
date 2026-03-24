document.addEventListener("DOMContentLoaded", () => {

  const donutCanvas = document.getElementById("donutChart")
  const barCanvas = document.getElementById("barChart")

  if (!donutCanvas || !barCanvas) {
    console.log("❌ Canvas не найден")
    return
  }

  const donut = donutCanvas.getContext("2d")
  const bar = barCanvas.getContext("2d")

  let progressMode = "deadlines"

  // ===== AVATAR =====
  const avatar = document.getElementById("avatar")
  const savedAvatar = localStorage.getItem("avatar")

  if (savedAvatar) {
    avatar.src = savedAvatar
  } else {
    avatar.src = "https://via.placeholder.com/40"
  }

  // ===== ДАННЫЕ =====
  function getRealStats() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []

    if (tasks.length === 0) {
      return [40, 20, 20, 20]
    }

    let study = 0, exam = 0, project = 0, personal = 0

    tasks.forEach(t => {
      const cat = t.category ? t.category.toLowerCase() : ""

      if (cat.includes("study")) study++
      else if (cat.includes("exam")) exam++
      else if (cat.includes("project")) project++
      else personal++
    })

    let total = tasks.length

    return [
      Math.round(study / total * 100),
      Math.round(exam / total * 100),
      Math.round(project / total * 100),
      Math.round(personal / total * 100)
    ]
  }

  // ===== ЛЕГЕНДА =====
  function updateLegend(data) {
    document.getElementById("studyText").textContent = "Study " + data[0] + "%"
    document.getElementById("examText").textContent = "Exam " + data[1] + "%"
    document.getElementById("projectText").textContent = "Project " + data[2] + "%"
    document.getElementById("personalText").textContent = "Personal " + data[3] + "%"
  }

  // ===== DONUT =====
  function drawDonut(data) {
    let progress = 0

    function animate() {
      donut.clearRect(0, 0, 220, 220)

      let colors = ["#2F80ED", "#EB5757", "#27AE60", "#F2C94C"]
      let start = -Math.PI / 2

      data.forEach((value, i) => {
        let angle = (value / 100) * 2 * Math.PI * progress

        donut.beginPath()
        donut.arc(110, 110, 80, start, start + angle)
        donut.strokeStyle = colors[i]
        donut.lineWidth = 40
        donut.lineCap = "round"
        donut.stroke()

        start += (value / 100) * 2 * Math.PI
      })

      progress += 0.04

      if (progress <= 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
    updateLegend(data)
  }

  // ===== BAR =====
  function drawBars(data) {
    let progress = 0

    function animate() {
      bar.clearRect(0, 0, 500, 220)

      data.forEach((value, i) => {
        let x = i * 90 + 40
        let height = value * 30 * progress
        let y = 200 - height

        bar.fillStyle = "#7a5524"
        bar.fillRect(x, y, 50, height)
      })

      progress += 0.04

      if (progress <= 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  // ===== ОБНОВЛЕНИЕ =====
  function updateCharts() {

    let stats

    if (progressMode === "deadlines") {
      stats = getRealStats()
    } else {
      // 💥 режим focus (другие данные)
      stats = [
        Math.floor(Math.random()*100),
        Math.floor(Math.random()*100),
        Math.floor(Math.random()*100),
        Math.floor(Math.random()*100)
      ]
    }

    console.log("MODE:", progressMode)
    console.log("STATS:", stats)

    drawDonut(stats)

    drawBars([
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6)
    ])
  }

  // ===== RADIO =====
  document.querySelectorAll("input[name='progress']").forEach(radio => {
    radio.addEventListener("change", e => {
      progressMode = e.target.value
      updateCharts()
    })
  })

  // ===== СТАРТ =====
  updateCharts()

})