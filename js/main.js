// ANIMATION
const tl = gsap.timeline({defaults: {ease: 'power1.out'}});

tl.to('.text', {y: 0, duration: 0.5, stagger: 0.5});
tl.to('#cover', {y: "-120%", duration: 0.75, delay: 0.75});
tl.fromTo('.container', {opacity: 0, y: "100%"}, {opacity: 1, y: "0%", duration: 0.5});

//TODO LIST
class Todo {
    constructor(name, checked) {
        this.name = name;
        this.checked = checked;
    }
}

let todos = [];

let todo = new Todo('Skriva javascript', false);   
let todo2 = new Todo('Plugga', false);
let todo3 = new Todo('Laga mat', false);

todos.push(todo);
todos.push(todo2);
todos.push(todo3);
let savedVaues = localStorage.getItem("todos");

if (savedVaues != null) {
    todos = JSON.parse(savedVaues);
}

createHTML();

const todoList = document.getElementById("todo-list");
todoList.addEventListener("click", deleteCheck);

const checkedTopButton = document.getElementById("checkedTop");
checkedTopButton.addEventListener("click", checkedTop);

const uncheckedTopButton = document.getElementById("uncheckedTop");
uncheckedTopButton.addEventListener("click", uncheckedTop);

const todoButton = document.getElementById("todo-button");
todoButton.addEventListener("click", createTodo)
    
function createTodo(event) {
    event.preventDefault();

    let todoContent = document.getElementById("todo-input").value;

    const newTodo = new Todo(todoContent, false)

    todos.push(newTodo);

    createHTML();
}

function createHTML() {

    let container = document.getElementById("todo-list");
    container.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {

        const todoDiv = document.createElement("div");
        container.appendChild(todoDiv);
        todoDiv.classList.add("todo");

        // SKAPA LI
        const todoItem = document.createElement('li');
        todoItem.innerText = todos[i].name;
        todoDiv.appendChild(todoItem);
        todoItem.classList.add("todo-item");
   

        // SKAPA CHECK KNAPP
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // SKAPA TRASH KNAPP
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-times-circle"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        if(todos[i].checked == true) {
            todoDiv.classList.toggle("completed");
        }
    }

    document.getElementById("todo-input").value = "";

    localStorage.setItem("todos", JSON.stringify(todos));
}

function uncheckedTop(event) {
    event.preventDefault();
     function compare( a, b ) {
        if ( a.checked < b.checked ){
          return -1;
        }
        if ( a.checked > b.checked ){
          return 1;
        }
        return 0;
      }

      todos.sort( compare );

      createHTML();
      localStorage.setItem("todos", JSON.stringify(todos));
}

function checkedTop(event) {
    event.preventDefault();
     function compare( a, b ) {
        if ( a.checked > b.checked ){
          return -1;
        }
        if ( a.checked < b.checked ){
          return 1;
        }
        return 0;
      }
      todos.sort( compare );

      createHTML();
      localStorage.setItem("todos", JSON.stringify(todos));
}


function deleteCheck(e) {
    const item = e.target;
    
    // DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        const text = todo.innerText;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name == text) {
                todos.splice(i, 1);
            }
        }

        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    // CHECK TODO
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");

        const text = todo.innerText;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name == text) {
                todos[i].checked = !todos[i].checked;
            }
        }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}


