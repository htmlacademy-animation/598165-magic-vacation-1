export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  document.querySelector(`[data-target="result"]`)
    .addEventListener(`click`, () => {
      restartSvg(document.querySelector(`#result svg`));
    });

  document.querySelector(`[data-target="result2"]`)
    .addEventListener(`click`, () => {
      restartSvg(document.querySelector(`#result2 svg`));
    });


  const restartSvg = (svg) => {
    [
      ...svg.querySelectorAll(`animate`),
      ...svg.querySelectorAll(`animateTransform`),
      ...svg.querySelectorAll(`animateMotion`),
      ...svg.querySelectorAll(`set`)
    ]
      .forEach((animation) => animation.beginElement());
  };


};
