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

initList();

let updateTodoList = function() {
    let todoListDiv =
    document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    for (let todo in todoList) {
        let newElement = document.createElement("div");
        let newContent = document.createTextNode(todoList[todo].title + " " + todoList[todo].description);
        newElement.appendChild(newContent);

        //create deletion button
        let newDeleteButton = document.createElement("input")
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.addEventListener("click",
            function(){
                deleteTodo(todo);
            }
        );
        //add deletion button to the element
        newElement.appendChild(newDeleteButton);
        //add everything to the div
        todoListDiv.appendChild(newElement);
    }

}


setInterval(updateTodoList, 1000);

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
    window.localStorage.setItem("todos", JSON.stringify(todoList));
  }

  //step 3c
  let deleteTodo = function(index) {
    todoList.splice(index,1);
    // step 3d
    window.localStorage.setItem("todos", JSON.stringify(todoList));
}