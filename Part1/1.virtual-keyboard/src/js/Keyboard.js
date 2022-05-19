export default class Keyboard {
  #switchEl;
  #fontSelectEl;

  constructor() {
    this.#assingElement();
    this.#addEvent();
  }

  #assingElement() {
    this.#switchEl = document.getElementById('switch');
    this.#fontSelectEl = document.getElementById('font');
  }

  #addEvent() {
    this.#switchEl.addEventListener('change', event => {
      document.documentElement.setAttribute(
        'theme',
        event.target.checked ? 'dark-mode' : '',
      );
    });
    this.#fontSelectEl.addEventListener('change', event => {
      document.body.style.fontFamily = event.target.value;
    });
  }
}
