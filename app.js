// ToDos -- Task-Mate (OOP To-Do List App)

// Add new task -- DONE
// Display the task -- DONE
// Clear fields after submitting the task -- DONE
// Delete task -- DONE
// Clear ALL tasks -- DONE
// Filter through tasks

// Time and Date
// Show real time (dynamically) -- DONE
// Show real date (dynamically) -- DONE

// Local Storage Abilities
// Store tasks in Local Storage -- DONE
// Delete task in UI & Local Storage -- DONE
// Clear ALL tasks in UI & Local Storage -- DONE

// Three classes
// The UI class will handle UI manipulations
// The task class will handle creating a task
// The store class will handle local storage duties

// The Task Class
class Task {
  constructor(taskValue, taskDetailValue) {
    this.taskValue = taskValue;
    this.taskDetailValue = taskDetailValue;
  }
}

// The UI Class
class UI {
  addTasksToList(task) {
    // Create a list to hold new task
    const li = document.createElement('li');

    // Add a class to the li
    li.className = 'collection-item';

    // So we can have the collapsible effect thingy
    // We create two divs and add the classes and spans and all else that is needed
    let divTaskValue = document.createElement('span'); // First div for the task;
    divTaskValue.className = 'collapsible-header';
    divTaskValue.appendChild(document.createTextNode(task.taskValue));

    let divTaskDetail = document.createElement('span');
    divTaskDetail.className = 'collapsible-body';
    divTaskDetail.appendChild(document.createTextNode(task.taskDetailValue));

    // So we add the text entered to create the new task to be the name of a new collection-item
    // li.appendChild(document.createTextNode(taskInput.value));
    li.appendChild(divTaskValue);
    li.appendChild(divTaskDetail);

    // Create the link (for deletion)
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; // materialize helper classes
    link.innerHTML = '<i class="fa fa-remove"></i>'; // add an icon to the link
    li.style.color = 'black';
    li.appendChild(link);
    // divTaskValue.appendChild(link);

    taskList.appendChild(li);

    // console.log(taskList, 'task list');
  }

  showAlert(message, className) {
    // Create HTML elements to display alerts just above the form
    // requirements: div, parent elements

    // Create div
    const div = document.createElement('div');

    // Add a class
    div.className = `alert ${className}`;

    // Add The Text of the message to the element
    div.appendChild(document.createTextNode(message));

    // Get the second parent element - the form
    const card = document.querySelector('.card');

    // So we insert the div into the DOM like so:
    card.parentNode.insertBefore(div, card);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  clearFields() {
    // Assign all the form values to become empty strings
    document.querySelector('#task').value = '';
    document.querySelector('#task-detail').value = '';
  }

  deleteTask(target) {
    target.className === 'fa fa-remove' ? target.parentElement.parentElement.remove() : null;
    // console.log(target.parentElement.parentElement);
  }

  setTimeAndDate() {
    let date = moment().format('MMMM Do YYYY');
    document.querySelector('.date').innerHTML = date;

    let time = moment().format('h:mm');
    document.querySelector('.time').innerHTML = time;
  }

  clearTasks() {
    let taskList = document.querySelector('ul');
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

class Store {
  static fetchTasks() {
    // Initialise a tasks variable
    let tasks;

    // Now we check if there is an existing task in LS
    // If there isn't, we set tasks to become an array
    // Else, we convert the tasks found in the LS to be an object

    tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));
    return tasks;
  }

  static addTasksToLS(task) {
    const tasks = Store.fetchTasks();

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static displayTasks() {
    const tasks = Store.fetchTasks();
    // We fetch the pre-existing tasks from the LS
    // Then call the method that already does this job of displaying and adding tasks to the list
    tasks.forEach(task => {
      const ui = new UI();
      ui.addTasksToList(task);
    });
  }

  static deleteTasksFromLS(taskDetailValue) {
    const tasks = Store.fetchTasks();
    // console.log(taskTitle);

    tasks.forEach((task, index) => {
      task.taskDetailValue === taskDetailValue ? tasks.splice(index, 1) : null;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static clearTasksInLS() {
    localStorage.clear();
  }
}

// The UI Variables
const card = document.querySelector('.card');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskDetail = document.querySelector('#task-detail');

// The Event Listeners
// For the collapsible effect
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible.expandable');
  var instances = M.Collapsible.init(elems, { accordion: false });
});
// This event listener is concerned with submitting a new task
form.addEventListener('submit', addNewTask);

function addNewTask(e) {
  // Values
  const taskValue = document.querySelector('#task').value;
  const taskDetailValue = document.querySelector('#task-detail').value;
  const task = new Task(taskValue, taskDetailValue);

  const ui = new UI();

  taskValue === '' || taskDetailValue === ''
    ? ui.showAlert('Please fill in all fields', 'error')
    : (ui.addTasksToList(task), Store.addTasksToLS(task), ui.showAlert('Task added successfully', 'success'), ui.clearFields());

  e.preventDefault();
}

taskList.addEventListener('click', removeTask);

function removeTask(e) {
  // Instantiate an object of the ui class
  const ui = new UI();

  ui.deleteTask(e.target);

  let taskDetailValue;
  if (e.target.parentElement.previousElementSibling.textContent) {
    taskDetailValue = e.target.parentElement.previousElementSibling.textContent;
  }
  Store.deleteTasksFromLS(taskDetailValue);
  ui.showAlert('Task successfully deleted', 'success');
}

// Set the correct time
document.addEventListener('DOMContentLoaded', setDateTime);

// Load tasks from Local Storage
document.addEventListener('DOMContentLoaded', Store.displayTasks);

function setDateTime() {
  const ui = new UI();

  ui.setTimeAndDate();
}

// Clear All Tasks
clearBtn.addEventListener('click', clearAllTasks);

function clearAllTasks(e) {
  const ui = new UI();

  ui.clearTasks();

  // Clear Local Storage of all tasks
  Store.clearTasksInLS();

  e.preventDefault();
}

// Filter through tasks
filter.addEventListener('keyup', fiterTasks);

function fiterTasks(e) {
  // console.log(e.target.value);
  const text = e.target.value.toLowerCase();

  // Get all the list items
  let listItems = document.querySelectorAll('.collection-item');
  // console.log(listItems);

  // Sort through the list items
  // Compare the text of the list items with what the user is entering into the filter input
  // Set the display
  listItems.forEach(task => {
    const item = task.firstChild.textContent;

    task.style.display = item.toLowerCase().indexOf(text) !== -1 ? 'block' : 'none';
  });
}
