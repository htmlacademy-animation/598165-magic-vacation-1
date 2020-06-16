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
  };

  const prizesScreenObserver = new MutationObserver(resetAnimation);
  prizesScreenObserver.observe(screenPrizes, {attributes: true});

};
