
function clearFilter()
{

}

function applyAllFilter()
{

}

function doneFilter()
{
    const parentDiv = document.getElementById("taskList");
    const childDiv = parentDiv.querySelectorAll("div");
    for(let child of childDiv)
    {
        if(childDiv.querySelector("input[type='checkbox']").checked)
            child.style.display = "block";
    }
}

function taskCompleted(event)
{
    
}

function taskPending(event)
{

}

function checkboxChange(event)
{
    const element = event.target;
    if(element.checked)
    {
        taskCompleted(event);
    }
    else
    {
        taskPending(event);
    }
}

function editTask(event)
{
    const div = event.target.parentElement;
    const span = div.querySelector("span");
}

function deleteTask(event)
{
    const element = event.target;
    element.closest("div").remove();
}

function getTask(task)
{
    let taskDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", checkboxChange);

    const taskDetails = document.createElement("span");
    taskDetails.textContent = task;

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.className = "editBtn";
    edit.addEventListener("click", editTask);

    const dlt = document.createElement("button");
    dlt.textContent = "Delete";
    dlt.className = "deleteBtn";
    dlt.addEventListener("click", deleteTask);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskDetails);
    taskDiv.appendChild(edit);
    taskDiv.appendChild(dlt);

    return taskDiv;
}

function createNewTask(task)
{
    if(task === "" || task === " ")
        alert("Invalid Task, Task cannot be empty!");
    else
    {
        const taskDiv = getTask(task);
        document.getElementById("taskList").appendChild(taskDiv);
    }
}

function addNewTask()
{
    const inputBox = document.getElementById("inptBox");
    createNewTask(inputBox.value);
    inputBox.value = "";
}