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
