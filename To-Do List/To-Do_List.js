function deleteItem(event)
{
    const item = event.target.parentElement;
    item.remove();
}

function createNewItem(item)
{
    const newItem = document.createElement("li");

    const element = document.createElement("span");
    element.textContent = item;

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.addEventListener("click", deleteItem);

    newItem.appendChild(element);
    newItem.appendChild(deletebtn);
    document.getElementById("itemList").appendChild(newItem);
}

function addNewItem()
{
    let item = document.getElementById("newItem").value;
    if(item === "")
        return;
    createNewItem(item);
    document.getElementById("newItem").value = "";
}