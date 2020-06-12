export default () => {
  const screenPrizes = document.querySelector(`.screen--prizes`);
  const journeysImg = document.querySelector(`.prizes__item--journeys img`);

  const journeysImgSrc = journeysImg.src;
  console.log(journeysImgSrc);

  const resetAnimation = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === `attributes` && mutation.attributeName === `class`) {
        if (!mutation.target.classList.contains(`active`)) {
          journeysImg.src = journeysImgSrc;
        } else {
          journeysImg.src = `${journeysImgSrc}#${new Date().getTime()}`;
        }
      }
    }
  };

  const prizesScreenObserver = new MutationObserver(resetAnimation);
  prizesScreenObserver.observe(screenPrizes, {attributes: true});

};
