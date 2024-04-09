const inputBox = document.getElementById("input-box");
const addButton = document.getElementById("add-button");
const listContainer = document.getElementById("list-container");
const errShow = document.getElementById("err");

function addTask() {
  if (!(inputBox.value === "")) {
    errShow.innerText = "";
    let li = document.createElement("li");
    console.log(inputBox.value);
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let editImg = document.createElement("img");
    editImg.src = "./edit.svg";
    editImg.setAttribute("class", "svgImg1");
    li.appendChild(editImg);

    let removeImg = document.createElement("img");
    removeImg.src = "./delete.svg";
    removeImg.setAttribute("class", "svgImg2");
    li.appendChild(removeImg);
  } else {
    errShow.innerText = "** PLease Enter Any Task";
  }

  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.classList.contains("svgImg2")) {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.classList.contains("svgImg1")) {
    const taskTextElement = e.target.parentElement.firstChild;
    inputBox.value = taskTextElement.textContent;
    addButton.innerText = "Update";
    addButton.onclick = function () {
      taskTextElement.textContent = inputBox.value;
      addButton.innerText = "Add";
      addButton.onclick = addTask;
      inputBox.value = "";
      saveData();
    };
  }
});

function saveData() {
  const tasksArray = Array.from(listContainer.querySelectorAll("li")).map(
    (li) => li.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function showTask() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasksArray = JSON.parse(savedTasks);

    tasksArray.forEach((task) => {
      let li = document.createElement("li");
      li.textContent = task;

      let editImg = document.createElement("img");
      editImg.src = "./edit.svg";
      editImg.setAttribute("class", "svgImg1");
      li.appendChild(editImg);

      let removeImg = document.createElement("img");
      removeImg.src = "./delete.svg";
      removeImg.setAttribute("class", "svgImg2");
      li.appendChild(removeImg);

      listContainer.appendChild(li);
    });
  }
}
showTask();
