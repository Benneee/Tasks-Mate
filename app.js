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
}

// The UI Variables
const card = document.querySelector('.card');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('.filter');
const clearBn = document.querySelector('.clear-tasks');
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

  ui.addTasksToList(task);
  // console.log(task);

  // Notify users after adding task
  ui.showAlert('Task added successfully', 'success');

  // Clear the fields after submission
  ui.clearFields();

  e.preventDefault();
}

taskList.addEventListener('click', removeTask);

function removeTask(e) {
  // Instantiate an object of the ui class
  const ui = new UI();

  ui.deleteTask(e.target);
}
