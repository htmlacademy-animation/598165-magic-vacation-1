import PrizeCounter from "./prize-counter";
const FIRST_COUNTER_CONTENT = [1, 2, 3];
const SECOND_COUNTER_CONTENT = [1, 2, 3, 4, 5, 6, 7];
const THIRD_COUNTER_CONTENT = [11, 185, 371, 514, 821, 849, 900];

const FIRST_COUNTER_DELAY = 2500;
const SECOND_COUNTER_DELAY = 5000;
const THIRD_COUNTER_DELAY = 6170;

export default () => {
  const screenPrizes = document.querySelector(`.screen--prizes`);
  const prizesImages = document.querySelectorAll(`.prizes__item img`);

  const originalSources = [];
  prizesImages.forEach((img) => {
    originalSources.push(img.src);
    img.src = `#`;
  });

  const resetAnimation = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === `attributes` && mutation.attributeName === `class`) {
        if (!mutation.target.classList.contains(`active`)) {
          prizesImages.forEach((img) => {
            img.src = `#`;
          });
        } else {
          prizesImages.forEach((img, i) => {
            img.src = `${originalSources[i]}?${new Date().getTime()}`;
          });
        }
      }
    }
    startPrizeCounters();
  };

  const prizesScreenObserver = new MutationObserver(resetAnimation);
  prizesScreenObserver.observe(screenPrizes, {attributes: true});

  const firstPrizeCounterElement = document.querySelector(`.prizes__item--journeys p b`);
  const secondPrizeCounterElement = document.querySelector(`.prizes__item--cases p b`);
  const thirdPrizeCounterElement = document.querySelector(`.prizes__item--codes p b`);

  const firstPrizeCounter =
    new PrizeCounter(firstPrizeCounterElement, FIRST_COUNTER_CONTENT);
  const secondPrizeCounter =
    new PrizeCounter(secondPrizeCounterElement, SECOND_COUNTER_CONTENT);
  const thirdPrizeCounter =
    new PrizeCounter(thirdPrizeCounterElement, THIRD_COUNTER_CONTENT);

  const startPrizeCounters = () => {
    setTimeout(() => firstPrizeCounter.start(), FIRST_COUNTER_DELAY);
    setTimeout(() => secondPrizeCounter.start(), SECOND_COUNTER_DELAY);
    setTimeout(() => thirdPrizeCounter.start(), THIRD_COUNTER_DELAY);
  };
};
