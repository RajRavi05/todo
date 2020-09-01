const formTask = document.querySelector('#form-task');
const list = document.querySelector('#list');
const taskInput = document.querySelector('#task');
const clearAll = document.querySelector('#clear');


loadEventListeners();
// load all event listeners
function loadEventListeners(){
    // load dom content
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task
    formTask.addEventListener('submit', addTask);

    // remove task
    list.addEventListener('click', removeTask);

    // clear all
    clearAll.addEventListener('click', clearTasks);
}


// get task from LS
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');

    // add class
    li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2';
    // create text node
    li.appendChild(document.createTextNode(task));

    // create a new link
    const link = document.createElement('a');
    link.className = 'delete-item';

    // add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    
    // append link to li
    li.appendChild(link);

    // append li to ul
    list.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
        confirm('Please add task');
    }else{
        // create element
        const li = document.createElement('li');
    
        // add class to li
        li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2';
    
        // create text node
        li.appendChild(document.createTextNode(taskInput.value));
    
        // create new link
        const link = document.createElement('a');
    
        // add class to it
        link.className = 'delete-item';
    
        // add icon
        link.innerHTML = '<i class="fas fa-trash-alt"></i> ';
    
        // append link li
        li.appendChild(link);
    
        // append li to ul
        list.appendChild(li);
    
        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';
    }

    
    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}


function  clearTasks(){
    list.innerHTML = '';
    clearFromLs();
}


function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTaskFromLocalStorage(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearFromLs(){
    localStorage.clear();
}