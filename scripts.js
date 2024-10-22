"use strict"
let todoList = []; //declares a new array for Your todo list

// step 3.a - test data
let initList = function() {
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

initList();