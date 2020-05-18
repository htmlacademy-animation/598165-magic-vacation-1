export default () => {
  const lastRulesItem = document.querySelector(`.rules__item:last-child`);
  const rulesLinkButton = document.querySelector(`.rules__link`);
  const screenRules = document.querySelector(`.screen--rules`);

  const hideRulesLinkButton = (mutationList) => {
    for (let mutation of mutationList) {
      if (mutation.type === `attributes` && mutation.attributeName === `class`) {
        if (!mutation.target.classList.contains(`active`)) {
          rulesLinkButton.classList.remove(`rules__link--visible`);
        }
      }
    }
  };

  const rulesScreenObserver = new MutationObserver(hideRulesLinkButton);
  rulesScreenObserver.observe(screenRules, {attributes: true});

  lastRulesItem.addEventListener(`animationstart`, () => {
    setTimeout(() => rulesLinkButton.classList.add(`rules__link--visible`), 233);
  });
};
