export default class AnimatedTypography {
  constructor(elementSelector, duration, classForActivate, property, splitWords = true) {
    this._DELAY_DELTA = 50;
    this._WORD_DELAY = 300;
    this._duration = duration;
    this._classForActivate = classForActivate;
    this._property = property;
    this._splitWords = splitWords;

    this._element = document.querySelector(elementSelector);
    this._words = [];
  }

  init() {
    if (!this._element) {
      return;
    }
    if (this._splitWords) {
      this.splitWords();
    } else {
      this._words.push(this._element.textContent.trim());
    }
    this.prepareText();
  }

  prepareLetter(letter, letterNumber, wordDelay) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    if (letter === ` `) {
      span.style.width = `0.2em`;
    } else {
      span.classList.add(letter.toUpperCase());

      let delay = (letterNumber) % 2 ?
        this._DELAY_DELTA * (letterNumber + 1) + wordDelay :
        this._DELAY_DELTA * (letterNumber - 1) + wordDelay;

      delay = delay < 0 ? 0 : delay;

      span.style.transition = `${this._property} ${this._duration}ms ease-out ${delay}ms`;
    }
    return span;
  }

  splitWords() {
    this._words = this._element.textContent
      .trim().split(` `).filter((word) => word !== ``);
  }

  prepareText() {
    const content = this._words.reduce((parentFragment, word, wordNumber) => {
      const wordDelay = wordNumber * this._WORD_DELAY;

      const wordElement = [...word].reduce((fragment, letter, number) => {
        fragment.appendChild(this.prepareLetter(letter, number, wordDelay));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`word-animation`);

      wordContainer.appendChild(wordElement);
      parentFragment.appendChild(wordContainer);
      return parentFragment;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
