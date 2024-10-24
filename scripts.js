"use strict"
let todoList = []; //declares a new array for Your todo list

// step 3.a - test data
let initList = function() {
    // step 3d
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else{
//code creating a default list with 2 items
    todoList.push(
    {
        title: "Learn JS",
        description: "Create a demo application for my TODO's",
        place: "445",
        category: '',
        dueDate: new Date(2024,10,16)
    },
    {
        title: "Lecture test",
        description: "Quick test from the first three lectures",
        place: "F6",
        category: '',
        dueDate: new Date(2024,10,17)
    }
        // of course the lecture test mentioned above will not take place
    );
}
}
//step 4
//initList();

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        // parsing JSON respone to JS object
        let responseObj = JSON.parse(req.responseText);
        let records = responseObj.record;
        for (let record in records) {
            todoList.push(
                {
                    title:records[record].title,
                    description: records[record].description,
                    place: records[record].place,
                    category: records[record].category,
                    dueDate: records[record].dueDate
                }
            )
        }
        
    }
};

req.open("GET", "https://api.jsonbin.io/v3/b/67197594acd3cb34a89bf98f/latest", true);
req.setRequestHeader("X-Master-Key", "$2a$10$v5AIiUcMItBWyWO03Obg0u4uaZ9XQRFvbnY/20M1vLZrYt5yYEWRS");
req.send();

let updateTodoList = function() {
    let todoTableBody =
    document.querySelector("#todoTable tbody");

    //remove all elements
    while (todoTableBody.firstChild) {
        todoTableBody.removeChild(todoTableBody.firstChild);
    }

    //add all elements - step 3e updated
    let filterInput = document.getElementById("inputSearch");   
    for (let todo in todoList) {
    if (
        // if any condtition is valid it will be display
        (filterInput.value == "") ||
        (todoList[todo].title.includes(filterInput.value)) ||
        (todoList[todo].description.includes(filterInput.value))
    ) {
        // creates row for each task
        let row = document.createElement("tr");
        
        // add each information
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
        let newDeleteButton = document.createElement("input")
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.addEventListener("click",
            function(){
                deleteTodo(todo);
            }
        );
        //add deletion button to the element
        actionCell.appendChild(newDeleteButton);
        row.appendChild(actionCell);

        todoTableBody.appendChild(row);
    }
}

}


setInterval(updateTodoList, 1000);

let updateJSONbin = function() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
    }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/67197594acd3cb34a89bf98f", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$v5AIiUcMItBWyWO03Obg0u4uaZ9XQRFvbnY/20M1vLZrYt5yYEWRS");
    let jsonData = JSON.stringify(todoList);
    req.send(jsonData);
    }

//step 3b
let addTodo = function() {
    //get the elements in the form
      let inputTitle = document.getElementById("inputTitle");
      let inputDescription = document.getElementById("inputDescription");
      let inputPlace = document.getElementById("inputPlace");
      let inputDate = document.getElementById("inputDate");
    //get the values from the form
      let newTitle = inputTitle.value;
      let newDescription = inputDescription.value;
      let newPlace = inputPlace.value;
      let newDate = new Date(inputDate.value);
    //create new item
      let newTodo = {
          title: newTitle,
          description: newDescription,
          place: newPlace,
          category: '',
          dueDate: newDate
      };
    //add item to the list
      todoList.push(newTodo);
    // step 3d
    // window.localStorage.setItem("todos", JSON.stringify(todoList));
    //step 4
    updateJSONbin();
  }

  //step 3c
  let deleteTodo = function(index) {
    todoList.splice(index,1);
    // step 3d
    // window.localStorage.setItem("todos", JSON.stringify(todoList));
    //step 4
    updateJSONbin();
}