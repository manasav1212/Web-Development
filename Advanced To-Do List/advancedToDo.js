const db_URL = "http://localhost:8080/todo";

window.onload = loadTasks;

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

async function taskCompleted(event)
{
    const element = event.target;
    const div = element.closest("div");
    const id = div.dataset.id;
    const result = await fetch(`${db_URL}/done/${id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status:true})
    });
    if(!result.ok)
    {
        const {error} = await result.json;
        console.log(`Error: ${error}`);
        alert("Error updating status..Refresh and Try again.");
    }
}

async function taskPending(event)
{
    const element = event.target;
    const div = element.closest("div");
    const id = div.dataset.id;
    const result = await fetch(`${db_URL}/done/${id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status:false})
    });
    if(!result.ok)
    {
        const {error} = await result.json;
        console.log(`Error: ${error}`);
        alert("Error updating status..Refresh and Try again.");
    }
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

async function editTask(event)
{
    const div = event.target.parentElement;
    const id = div.dataset.id;
    const span = div.querySelector("span");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.textContent;

    div.replaceChild(editInput, span);
    editInput.focus();
    editInput.addEventListener("keydown", async function(event){
        if(event.key === "Enter")
        {
            if(editInput.value != "" && editInput.value != " ")
            {
                const result = await fetch(`${db_URL}/edit/${id}`,{
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body:  JSON.stringify({name:editInput.value})
                });
                if(!result.ok)
                {
                    const {error} = await result.json;
                    console.log(`Error: ${error}`);
                    alert("Error editing task name..Try again.");
                }
                else
                {
                    const res = await result.json();
                    span.textContent = editInput.value;
                    div.replaceChild(span, editInput);
                }
            }
            else
            {
                alert("Task Cannot be empty");
                div.replaceChild(span, editInput)
            }
        }
    });
}

async function deleteTask(event)
{
    const element = event.target;
    const div = element.closest("div");
    const id = div.dataset.id;
    const result = await fetch(`${db_URL}/${id}`,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if(!result.ok)
    {
        const {error} = await result.json;
        console.log(`Error: ${error}`);
        alert("Error deleting the task..Try again.");
    }
    else
        div.remove();
}

function getTask(id, task, status = false)
{
    let taskDiv = document.createElement("div");
    taskDiv.dataset.id = id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = status;
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

async function loadTasks()
{
    const result = await fetch(db_URL);
    if(!result.ok)
    {
        const {error} = await result.json;
        console.log(`Error: ${error}`);
        alert("Error loading tasks, refresh the page.");
        return;
    }
    const Tasks = await result.json();
    for(let task of Tasks)
    {
        const taskDiv = getTask(task.id, task.name, task.status);
        document.getElementById("taskList").appendChild(taskDiv);
    }
}

async function createNewTask(task)
{
    if(task === "" || task === " ")
        alert("Invalid Task, Task cannot be empty!");
    else
    {
        const res = await fetch(`${db_URL}/add`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: task})
        });
        if(!res.ok)
        {
            const {error} = await result.json;
            console.log(`Error: ${error}`);
            alert("Error adding new task. Try again.");
        }
        else
        {
            const result = await res.json();
            const taskDiv = getTask(result.id, result.name);
            document.getElementById("taskList").appendChild(taskDiv);
        }
    }
}

function addNewTask()
{
    const inputBox = document.getElementById("inptBox");
    createNewTask(inputBox.value);
    inputBox.value = "";
}