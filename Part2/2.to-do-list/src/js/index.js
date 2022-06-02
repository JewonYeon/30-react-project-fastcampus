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
  }

  addEvent() {
    this.addBtnEl.addEventListener('click', this.onClickAddBtn.bind(this));
    this.todoListEl.addEventListener('click', this.onClickTodoList.bind(this));
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
    if (button?.matches('#delete-btn')) {
      this.deleteTodo(target);
    }
  }

  deleteTodo(target) {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.add('delete');
    todoDiv.addEventListener('transitionend', () => {
      todoDiv.remove();
    });
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
}

document.addEventListener('DOMContentLoaded', () => {
  const todoList = new TodoList();
});
