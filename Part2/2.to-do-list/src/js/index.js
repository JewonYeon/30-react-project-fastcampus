import '@fortawesome/fontawesome-free/js/all.min.js';
import '../scss/style.scss';

class TodoList {
  inputContainerEl;
  inputAreaEl;
  todoInputEl;
  addBtnEl;

  todoConatinerEl;
  todoListEl;

  constructor() {
    this.assignElement();
    this.addEvent();
  }

  assignElement() {
    this.inputContainerEl = document.getElementById('input-container');
    this.inputAreaEl = this.inputContainerEl.querySelector('#input-area');
    this.todoInputEl = this.inputAreaEl.querySelector('#todo-input');
    this.addBtnEl = this.inputAreaEl.querySelector('#add-btn');

    this.todoConatinerEl = document.getElementById('todo-container');
    this.todoListEl = this.todoConatinerEl.querySelector('#todo-list');

    this.radioAreaEl = this.inputContainerEl.querySelector('#radio-area');
    this.filterRadioBtnEls = this.radioAreaEl.querySelectorAll('input[name="filter"]');
  }

  addEvent() {
    this.addBtnEl.addEventListener('click', this.onClickAddBtn.bind(this));
    this.todoListEl.addEventListener('click', this.onClickTodoList.bind(this));
    this.addRadioBtnEvent();
  }

  addRadioBtnEvent() {
    for (const filterRadioBtnEl of this.filterRadioBtnEls) {
      filterRadioBtnEl.addEventListener('click', this.onClickRadioBtn.bind(this));
    }
  }

  onClickAddBtn() {
    const inputValue = this.todoInputEl.value;
    if (!inputValue) {
      alert('내용을 입력해주세요.');
      return;
    }

    this.createTodoElement(inputValue);
    this.todoInputEl.value = '';
  }

  onClickTodoList(event) {
    const { target } = event;
    const button = target.closest('button');

    if (!button) return;

    if (button.matches('#delete-btn')) {
      this.deleteTodo(target);
    } else if (button.matches('#edit-btn')) {
      this.editTodo(target);
    } else if (button.matches('#save-btn')) {
      this.saveTodo(target);
    } else if (button.matches('#complete-btn')) {
      this.completeTodo(target);
    }
  }

  onClickRadioBtn(event) {
    const { value } = event.target;
    this.filterTodo(value);
  }

  deleteTodo(target) {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.add('delete');
    todoDiv.addEventListener('transitionend', () => {
      todoDiv.remove();
    });
  }

  editTodo(target) {
    const todoDiv = target.closest('.todo');
    const todoInputEl = todoDiv.querySelector('input');

    todoInputEl.readOnly = false;
    todoInputEl.focus();
    todoDiv.classList.add('edit');
  }

  saveTodo(target) {
    const todoDiv = target.closest('.todo');
    const todoInputEl = todoDiv.querySelector('input');

    todoInputEl.readOnly = true;
    todoDiv.classList.remove('edit');
  }

  completeTodo(target) {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.toggle('done');
  }

  createTodoElement(value) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoContent = document.createElement('input');
    todoContent.value = value;
    todoContent.readOnly = true;
    todoContent.classList.add('todo-item');

    const fragment = new DocumentFragment();
    fragment.appendChild(todoContent);
    fragment.appendChild(this.createButton('complete-btn', 'complete-btn', ['fas', 'fa-check']));
    fragment.appendChild(this.createButton('edit-btn', 'edit-btn', ['fas', 'fa-edit']));
    fragment.appendChild(this.createButton('delete-btn', 'delete-btn', ['fas', 'fa-trash']));
    fragment.appendChild(this.createButton('save-btn', 'save-btn', ['fas', 'fa-save']));
    todoDiv.appendChild(fragment);

    this.todoListEl.appendChild(todoDiv);
  }

  createButton(buttonId, buttonClassName, iconClassName = []) {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add(...iconClassName);
    button.appendChild(icon);
    button.id = buttonId;
    button.classList.add(buttonClassName);
    return button;
  }

  filterTodo(status) {
    const todoDivEls = this.todoListEl.querySelectorAll('div.todo');

    for (const todoDivEl of todoDivEls) {
      switch (status) {
        case 'ALL':
          todoDivEl.style.display = 'flex';
          break;
        case 'DONE':
          todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'flex' : 'none';
          break;
        case 'TODO':
          todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'none' : 'flex';
          break;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoList = new TodoList();
});
