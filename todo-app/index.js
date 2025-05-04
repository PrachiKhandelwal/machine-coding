document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const addTodoBtn = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");

    let editMode = false;
    let editItem = null;

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const todoText = input.value.trim();
        console.log(todoText);
        if (!todoText) {
            alert("please enter a valid todo");
            return;
        }
        if (editMode) {
            editTodoHandler(todoText);
        } else {
            addTodoHandler(todoText);
        }
        input.value = "";
    });

    todoList.addEventListener("click", (e) => {
        const target = e.target;

        if (target.tagName === "BUTTON") {
            const selectedTodo = target.parentNode;
            if (target.innerText === "❌ Delete Todo") {
                selectedTodo.remove();
            } else {
                editMode = true;
                editItem = selectedTodo;
                input.value = selectedTodo.firstChild.innerText;
                addTodoBtn.innerText = "Edit Todo";
                input.focus();
            }
        }
    });

    const addTodoHandler = (todo) => {
        const todoItem = document.createElement("li");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        todoItem.innerHTML = `<span>${todo}</span>`;
        editBtn.innerText = "✏️ Edit Todo";
        deleteBtn.innerText = "❌ Delete Todo";
        todoItem.appendChild(editBtn);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
    };
    const editTodoHandler = () => {
        editItem.firstChild.innerText = todoText;
        addTodoBtn.innerText = "Add Todo";
        editMode = false;
        editItem = null;
    };
});
