"use strict";
let todoList = []; // Deklaracja nowej tablicy dla listy zadań

// request conf
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
        let responseObj = JSON.parse(req.responseText);
        let records = responseObj.record;
        for (let record in records) {
            todoList.push({
                title: records[record].title,
                description: records[record].description,
                place: records[record].place,
                category: records[record].category,
                dueDate: records[record].dueDate
            });
        }
    }
};

req.open("GET", "https://api.jsonbin.io/v3/b/67197594acd3cb34a89bf98f/latest", true);
req.setRequestHeader("X-Master-Key", "$2a$10$v5AIiUcMItBWyWO03Obg0u4uaZ9XQRFvbnY/20M1vLZrYt5yYEWRS");
req.send();

let updateTodoList = function() {
    let todoTableBody = document.querySelector("#todoTable tbody");

    // delete all elements
    while (todoTableBody.firstChild) {
        todoTableBody.removeChild(todoTableBody.firstChild);
    }

    // add elements
    let filterInput = document.getElementById("inputSearch");
    for (let todo in todoList) {
        if (
            filterInput.value === "" ||
            todoList[todo].title.includes(filterInput.value) ||
            todoList[todo].description.includes(filterInput.value)
        ) {
            let row = document.createElement("tr");

            let titleCell = document.createElement("td");
            titleCell.textContent = todoList[todo].title;
            row.appendChild(titleCell);

            let descriptionCell = document.createElement("td");
            descriptionCell.textContent = todoList[todo].description;
            row.appendChild(descriptionCell);

            let placeCell = document.createElement("td");
            placeCell.textContent = todoList[todo].place;
            row.appendChild(placeCell);

            let dueDateCell = document.createElement("td");
            dueDateCell.textContent = new Date(todoList[todo].dueDate).toLocaleDateString();
            row.appendChild(dueDateCell);

            let actionCell = document.createElement("td");
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "Done";
            newDeleteButton.addEventListener("click", function() {
                deleteTodo(todo);
            });
            actionCell.appendChild(newDeleteButton);
            row.appendChild(actionCell);

            todoTableBody.appendChild(row);
        }
    }
};

// update per one second
setInterval(updateTodoList, 1000);

let updateJSONbin = function() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/67197594acd3cb34a89bf98f", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$v5AIiUcMItBWyWO03Obg0u4uaZ9XQRFvbnY/20M1vZrYt5yYEWRS");
    let jsonData = JSON.stringify(todoList);
    req.send(jsonData);
};

// add new task
let addTodo = function() {
    let inputTitle = document.getElementById("inputTitle");
    if (inputTitle.value.trim() === "") {
        alert("Title cannot be empty!");
        return;
    }
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");

    let newTodo = {
        title: inputTitle.value,
        description: inputDescription.value,
        place: inputPlace.value,
        category: '',
        dueDate: inputDate.value === "" ? new Date() : new Date(inputDate.value)
    };

    todoList.push(newTodo);
    updateJSONbin();

    inputTitle.value = "";
    inputDescription.value = "";
    inputPlace.value = "";
    inputDate.value = "";
};

// task deletion / mark as done
let deleteTodo = function(index) {
    todoList.splice(index, 1);
    updateJSONbin();
};