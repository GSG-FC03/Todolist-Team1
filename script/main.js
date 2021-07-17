let formBlock = document.getElementById("addForm");
let btn = document.getElementById("addTaskButton");
let cancel = document.getElementById("cancel");
let add = document.getElementById("add");
let listDiv = document.getElementsByClassName("tasksDiv")[0];


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

  if (localStorage.getItem("count") === null)
  localStorage.setItem("count",0) //if there is no counter yet in the local storage, create it

  let data = {
    //create object for each task data
    id: localStorage.getItem("count"),
    name: task_name,
    due_time: task_due,
    details: task_details,
    isDone: false,
  };

  let temp; //declare temp variablee

  if (localStorage.getItem("tasks") === null) 
    temp = [];    //if there is no tasks array (initially), create an array for tasks

  else  // if there is already tasks array in the local storage bring it temporary to temp var
    temp = JSON.parse(localStorage.getItem("tasks"));
       
  if(task_name != "" && task_due != ""){
    temp.push(data); //appending the new task object to task array

    localStorage.setItem("tasks", JSON.stringify(temp));
    //replace tasks array in the local stirge with the new appended version

    localStorage.setItem("count",JSON.stringify(parseInt(data.id)+1));
    //increment count for the next task
  } 
};
list();


function list(){
  let temp = JSON.parse(localStorage.getItem("tasks"));
  temp.forEach(element => {
    let task = document.createElement("section");
    let left = document.createElement("section");
    let right = document.createElement("section");
    let task_data = document.createElement("task_data");

    task.className = "task";
    left.className = "left";
    right.className = "right";
    task_data.className = "task_data";


    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "check checkbox-effect checkbox-effect-4";
    left.append(checkBox);

    let name_sec = document.createElement("section");
    let name = document.createTextNode(element.name);
    name_sec.className = "task-name";
    name_sec.append(name);

    
    let due_sec = document.createElement("section");
    let due = document.createTextNode(element.due_time);
    due_sec.className = "due-date";
    due_sec.append(due);
    
    task_data.append(name_sec,due_sec);

    left.append(task_data);

    let edit = document.createElement("button");
    edit.className = "btn edit-btn";
    let icon = document.createElement("i");
    icon.className = "task-icon far fa-edit";
    edit.append(icon);

    let remove = document.createElement("button");
    remove.className = "btn delete-btn";
    let icon2 = document.createElement("i");
    icon2.className = "task-icon fas fa-trash";
    remove.append(icon2);


    right.append(edit,remove);

    task.append(left,right);

    listDiv.appendChild(task);
    console.log(element);
  });
}