
function clearFilter()
{
    document.getElementById("selectFilter").value = "none";
    const parentDiv = document.getElementById("taskList");
    const childDiv = parentDiv.querySelectorAll("div");
    for(let child of childDiv)
    {
        child.style.display = "block";
    }
}

function doneFilter()
{
    const parentDiv = document.getElementById("taskList");
    const childDiv = parentDiv.querySelectorAll("div");
    for(let child of childDiv)
    {
        child.style.display = "block";
        if(!(child.querySelector("input[type='checkbox']").checked))
        {
            child.style.display = "none";
        }
            
    }
}

function pendingFilter()
{
    const parentDiv = document.getElementById("taskList");
    const childDiv = parentDiv.querySelectorAll("div");
    for(let child of childDiv)
    {
        child.style.display = "block";
        if(child.querySelector("input[type='checkbox']").checked)
            child.style.display = "none";
    }
}

function handleFilterSelection(value)
{
    if(value === "done")
        doneFilter();
    else if(value === "pending")
        pendingFilter();
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

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.textContent;

    div.replaceChild(editInput, span);
    editInput.focus();
    editInput.addEventListener("keydown", function(event){
        if(event.key === "Enter")
        {
            span.textContent = editInput.value;
            div.replaceChild(span, editInput);
        }
    });
    editInput.addEventListener("blur",function(){
        span.textContent = editInput.value;
        div.replaceChild(span, editInput);
    });
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
    edit.textContent = "✏️";
    edit.className = "editBtn";
    edit.addEventListener("click", editTask);

    const dlt = document.createElement("button");
    dlt.textContent = "🗑️";
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