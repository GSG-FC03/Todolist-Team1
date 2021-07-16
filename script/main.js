let formBlock = document.getElementById("addForm");
let btn = document.getElementById("addTaskButton");
let cancel = document.getElementById("cancel");
let add = document.getElementById("add");

// clicking on add task button will open the add task form
btn.onclick = function () {
  formBlock.style.display = "block";
};
// clicking on cancel button will close the add task form
cancel.onclick = function () {
  formBlock.style.display = "none";
};

//clicking anywhere outside of the form block will close it
window.onclick = function (event) {
  if (event.target == formBlock) {
    formBlock.style.display = "none";
  }
};

add.onclick = function () {
  let task_name = document.getElementById("task_name").value;
  let task_due = document.getElementById("due_time").value;
  let task_details = document.getElementById("task_details").value;

  let data = {
    //create object for each task data
    name: task_name,
    due_time: task_due,
    details: task_details,
    isDone: false,
  };

  let temp; //declare temp variable

  if (localStorage.getItem("tasks") === null) 
    temp = [];    //if there is no tasks array (initially), create an array for tasks

  else  // if there is already tasks array in the local storage bring it temporary to temp var
    temp = JSON.parse(localStorage.getItem("tasks"));
       

  temp.push(data); //appending the new task object to task array

  localStorage.setItem("tasks", JSON.stringify(temp));
  //replace tasks array in the local stirge with the new appended version
};
