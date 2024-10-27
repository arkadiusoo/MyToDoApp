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

    // Usuń wszystkie elementy
    while (todoTableBody.firstChild) {
        todoTableBody.removeChild(todoTableBody.firstChild);
    }

    // Pobierz wartości filtrów daty
    let startDateInput = document.getElementById("startDate").value;
    let endDateInput = document.getElementById("endDate").value;
    let filterInput = document.getElementById("inputSearch").value;

    // Ustaw zakres dat, jeśli pola daty są wypełnione
    let startDate = startDateInput ? new Date(startDateInput).toISOString().split('T')[0] : null;
    let endDate = endDateInput ? new Date(endDateInput).toISOString().split('T')[0] : null;

    // Filtruj zadania według kryteriów wyszukiwania i zakresu dat
    let filteredTodos = todoList.filter(todo => {
        let todoDate = new Date(todo.dueDate).toISOString().split('T')[0];
        let matchesSearch = filterInput === "" || 
            todo.title.includes(filterInput) || 
            todo.description.includes(filterInput);
        
        let matchesDateStard = startDate === null ? true : false;
        let matchesDateEnd = endDate === null ? true : false;

        if (todoDate >= startDate) matchesDateStard = true;
        if (todoDate <= endDate) matchesDateEnd = true;
        console.log(todoDate)
        console.log(startDate)
        return matchesSearch && (matchesDateStard && matchesDateEnd);
    });
    // Sortowanie według daty od najwcześniejszej do najpóźniejszej
    filteredTodos.sort((a, b) => {
        let dateA = new Date(a.dueDate).toISOString().split('T')[0];
        let dateB = new Date(b.dueDate).toISOString().split('T')[0];
        return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    });

    // Dodaj przefiltrowane elementy do tabeli
    filteredTodos.forEach(todo => {
        let row = document.createElement("tr");

        let titleCell = document.createElement("td");
        titleCell.textContent = todo.title;
        row.appendChild(titleCell);

        let descriptionCell = document.createElement("td");
        descriptionCell.textContent = todo.description;
        row.appendChild(descriptionCell);

        let placeCell = document.createElement("td");
        placeCell.textContent = todo.place;
        row.appendChild(placeCell);

        let dueDateCell = document.createElement("td");
        dueDateCell.textContent = new Date(todo.dueDate).toLocaleDateString();
        row.appendChild(dueDateCell);

        let actionCell = document.createElement("td");
        actionCell.classList.add("action-cell");
        
        let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "Delete";
        newDeleteButton.classList.add("btn-delete");
        newDeleteButton.addEventListener("click", function() {
            deleteTodo(todo);
        });

        let newDoneButton = document.createElement("input");
        newDoneButton.type = "button";
        newDoneButton.value = "Done";
        newDoneButton.classList.add("btn-done");
        newDoneButton.addEventListener("click", function() {
            deleteTodo(todo);
        });

        actionCell.appendChild(newDoneButton);
        actionCell.appendChild(newDeleteButton);
        row.appendChild(actionCell);

        todoTableBody.appendChild(row);
    });
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
    req.setRequestHeader("X-Master-Key", "$2a$10$v5AIiUcMItBWyWO03Obg0u4uaZ9XQRFvbnY/20M1vLZrYt5yYEWRS");
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

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function clearFilters(){
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("inputSearch").value = "";
}