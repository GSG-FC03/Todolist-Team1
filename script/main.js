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

//Important: All Click actions save/edit/cancel/checkbox
window.onclick = function (event) {
  //---------->A. clicking anywhere outside of the form block will close it
  if (event.target == formBlock) {
    formBlock.style.display = "none";
  }

//----------->B. if the clicked item is the edit button.
else if (event.target.getAttribute("class") == "task-icon far fa-edit") {
  // Change Button icon to save
  event.target.setAttribute("class", "task-icon fas fa-save");
  // expand task and make white with border
  event.target.parentElement.parentElement.parentElement.style.height = "80px";
  event.target.parentElement.parentElement.parentElement.style.backgroundColor = "white";
  event.target.parentElement.parentElement.parentElement.style.border ="1px solid #4044ca";

// Changes in task name
  event.target.parentElement.parentElement.parentElement.getElementsByClassName(
    "task-name"
  )[0].style.color = "black";
  event.target.parentElement.parentElement.parentElement
    .getElementsByClassName("task-name")[0]
    .setAttribute("contenteditable", "true");
  event.target.parentElement.parentElement.parentElement.getElementsByClassName(
    "task-name"
  )[0].style.borderBottom = "1px solid #4044ca";

  // Make changes in due date
event.target.parentElement.parentElement.parentElement.getElementsByClassName("left")[0]
.getElementsByClassName("due-date")[0].getElementsByClassName("due")[0].removeAttribute("readonly");

  // remove check
  event.target.parentElement.parentElement.parentElement.getElementsByClassName(
    "check"
  )[0].style.display = "none";}



// -------------> c. if the clicked item is the save button.
else if (event.target.getAttribute("class") == "task-icon fas fa-save") {
  // Change Button icon to edit
  event.target.setAttribute("class", "task-icon far fa-edit");

// reset task to before click state
  event.target.parentElement.parentElement.parentElement.style.height = "70px";
  event.target.parentElement.parentElement.parentElement.style.backgroundColor =
    "#f2f2f2";
    event.target.parentElement.parentElement.parentElement.style.border = "none";


  // reset taskname to before click state
  event.target.parentElement.parentElement.parentElement.getElementsByClassName(
    "task-name"
  )[0].style.color = "#4044ca";
  event.target.parentElement.parentElement.parentElement
    .getElementsByClassName("task-name")[0]
    .setAttribute("contenteditable", "false");
  event.target.parentElement.parentElement.parentElement.getElementsByClassName(
    "task-name"
  )[0].style.borderBottom = "none";

  // reset duedate to before click state
event.target.parentElement.parentElement.parentElement.getElementsByClassName("left")[0]
.getElementsByClassName("due-date")[0].getElementsByClassName("due")[0]
.setAttribute("readonly", "true");

//   // show check
event.target.parentElement.parentElement.parentElement.getElementsByClassName(
  "check"
)[0].style.display = "flex";

// Change the local storage

let un= event.target.parentElement.parentElement.getElementsByTagName("label")[0].textContent;
let n=event.target.parentElement.parentElement.parentElement.getElementsByClassName("task-name")[0].textContent;
let dt=event.target.parentElement.parentElement.parentElement.getElementsByClassName("left")[0]
.getElementsByClassName("due-date")[0].getElementsByClassName("due")[0].value;

saveEdit(un,n,dt)}

// -------------> D. if the clicked item is the delete button.
else if (event.target.getAttribute("class") == "task-icon fas fa-trash") {

// Change the local storage
let un= event.target.parentElement.parentElement.getElementsByTagName("label")[0].textContent;
remTask(un)

// remove task from node tree
event.target.parentElement.parentElement.parentElement.remove();
}

//--------------> E. Change isDone value in array with check checkbox

else if (event.target.getAttribute("class") == "check checkbox-effect checkbox-effect-4"){
  let bln=  event.target.checked;
  let un= event.target.parentElement.parentElement.getElementsByClassName("right")[0].getElementsByTagName("label")[0].textContent;
  isdone(un,bln);
  if(bln)
    event.target.parentElement.getElementsByClassName("task-name")[0].className = "task-name-checked";
  else
    event.target.parentElement.getElementsByClassName("task-name-checked")[0].className = "task-name";
}
//Evoke the callCount function so the counter update
callCount();
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

  let temp; //declare temp variable

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

// Evoke the function list
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
    element.isDone == false?checkBox.checked=false:checkBox.checked=true;
    left.append(checkBox);
    let name_sec = document.createElement("section");
    let name = document.createTextNode(element.name);
    name_sec.className = element.isDone?"task-name-checked":"task-name";
    name_sec.append(name);

    
    let due_sec = document.createElement("section");
    let due = document.createElement("input");
    due.type="datetime-local";
    due.value=element.due_time;
    due.readOnly=true;
    due.className = "due";
    due_sec.className = "due-date";
    due_sec.append(due);
    
    task_data.append(name_sec,due_sec);

    left.append(task_data);

    let idLabel = document.createElement("label");
    idLabel.className = "idLabel";
    idLabel.textContent=element.id;

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

       

    right.append(idLabel,edit,remove);

    task.append(left,right);

    listDiv.appendChild(task);
    
  });
}




function saveEdit(un,n,dt) {
  let array=JSON.parse(localStorage.getItem("tasks"));
  console.log(array);
  let arrayFind=array.find((val)=>val.id==un);
  let Idx= array.indexOf(arrayFind);
  array[Idx].name=n;
  array[Idx].due_time=dt;
  localStorage.setItem("tasks",JSON.stringify(array))
  }

//Function of change isDone value in array
  function isdone(un,bln) {
    let array = JSON.parse(localStorage.getItem("tasks"));
    let arrayFind =array.find((val)=>val.id==un);
    let Idx= array.indexOf(arrayFind);
    array[Idx].isDone = bln;
    localStorage.setItem("tasks",JSON.stringify(array))
  }
 

//callCount function
function callCount(){
let countDone = 0;
let countUnDone = 0;
JSON.parse(localStorage.getItem("tasks")).forEach(element => {
  
  if(element.isDone == true)
  countDone++;
  else
  countUnDone++;
});

let done = document.getElementById("doneCount");
done.textContent = countDone;

let unDone = document.getElementById("unDoneCount");
unDone.textContent = countUnDone;
}

function remTask(un) {
  let array=JSON.parse(localStorage.getItem("tasks"));
  console.log(array);
  let arrayFind=array.find((val)=>val.id==un);
  let Idx= array.indexOf(arrayFind);
  array.splice(Idx,1);
  localStorage.setItem("tasks",JSON.stringify(array))
  }

callCount();
