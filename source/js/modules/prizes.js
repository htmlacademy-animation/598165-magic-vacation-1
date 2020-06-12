export default () => {
  const screenPrizes = document.querySelector(`.screen--prizes`);
  const journeysImg = document.querySelector(`.prizes__item--journeys img`);

  const originalJourneysImgSrc = journeysImg.src;

  const resetAnimation = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === `attributes` && mutation.attributeName === `class`) {
        if (!mutation.target.classList.contains(`active`)) {
          journeysImg.src = originalJourneysImgSrc;
        } else {
          journeysImg.src = `${originalJourneysImgSrc}#${new Date().getTime()}`;
        }
      }
    }
  };

  const prizesScreenObserver = new MutationObserver(resetAnimation);
  prizesScreenObserver.observe(screenPrizes, {attributes: true});

};
