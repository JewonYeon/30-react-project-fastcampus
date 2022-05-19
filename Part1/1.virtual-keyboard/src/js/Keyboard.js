export default class Keyboard {
  #switchEl;

  constructor() {
    this.#assingElement();
    this.#addEvent();
  }

  #assingElement() {
    this.#switchEl = document.getElementById('switch');
  }

  #addEvent() {
    this.#switchEl.addEventListener('change', event => {
      document.documentElement.setAttribute(
        'theme',
        event.target.checked ? 'dark-mode' : '',
      );
      console.log(event.target.checked);
    });
  }
}
