const TIMER_DURATION = 300;
import Timer from './game-timer';

export default () => {
  const screenGame = document.querySelector(`.screen--game`);
  const gameCounter = screenGame.querySelector(`.game__counter`);

  const timer = new Timer(gameCounter, TIMER_DURATION, showFailureScreen);

  const gameStartTriggers = document.querySelectorAll(`[href='#game']`);

  gameStartTriggers.forEach((gameStartTrigger) => {
    gameStartTrigger.addEventListener(`click`, () => timer.start());
  });

  function showFailureScreen() {
    let results = document.querySelectorAll(`.screen--result`);

    results.forEach(function (el) {
      el.classList.remove(`screen--show`);
      el.classList.add(`screen--hidden`);
    });

    let targetEl = [].slice.call(results).filter(function (el) {
      return el.getAttribute(`id`) === `result3`;
    });

    targetEl[0].classList.add(`screen--show`);
    targetEl[0].classList.remove(`screen--hidden`);

    const svg = document.querySelector(`#result3 .result__title img`);
    const originalSource = svg.src.split(`?`)[0];
    svg.src = `${originalSource}?${new Date().getTime()}`;
  }

};
