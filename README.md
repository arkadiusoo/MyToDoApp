# MyToDo App

MyToDo App is a simple, interactive to-do list application that enables users to add, filter, and manage tasks efficiently. The app features dark mode support and connects to a remote JSON bin for data storage.

## Features

- **Add New Tasks**: Enter task title, description, place, and due date.
- **Automatic Task Categorization**: Integration with the Groq API to automatically categorize tasks as either "Academic Zone" or "Personal Zone" based on task title and description.
- **Filter Tasks**: Filter tasks by date range or search by keywords.
- **Dark Mode Toggle**: Switch between light and dark modes for better accessibility.
- **Task Management**: Mark tasks as "Done" or delete them from the list.
- **Dynamic Data Storage**: Tasks are stored and updated in a remote JSON bin for persistence.

## Technologies

- **Frontend**: HTML, CSS (with Bootstrap styling)
- **JavaScript**: Dynamic task updates, filtering, and data handling.
- **API Integration**:
  - **Groq API**: Used for task categorization based on content analysis of titles and descriptions.
  - **JSON Bin**: For fetching and storing tasks to enable persistent data.

## How to Use

1. **Add Tasks**: Fill in task details and click "Add" to include it in the list.
2. **Automatic Categorization**: Tasks are automatically categorized as "Academic Zone" or "Personal Zone."
3. **Filter or Search**: Use date fields or the search box to filter tasks.
4. **Mark as Done**: Click "Done" to mark tasks as completed.
5. **Delete Tasks**: Use the "Delete" button to remove tasks.

## Setup

To run the application locally:

1. Clone the repository.
2. Open `index.html` in your browser.

## License

This project is open source and available under the [MIT License](LICENSE).
