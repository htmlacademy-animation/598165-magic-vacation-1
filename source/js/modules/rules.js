import AnimatedTypography from './animated-typography';

export default () => {
  const titleAnimation =
    new AnimatedTypography(`.rules__title`, 300, `active`, `transform`, false);
  const lastRulesItem = document.querySelector(`.rules__item:last-child`);
  const rulesLinkButton = document.querySelector(`.rules__link`);
  const screenRules = document.querySelector(`.screen--rules`);

  titleAnimation.init();
  setTimeout(() => titleAnimation.runAnimation(), 0);


  const resetAnimation = (mutationList) => {
    for (let mutation of mutationList) {
      if (mutation.type === `attributes` && mutation.attributeName === `class`) {
        if (!mutation.target.classList.contains(`active`)) {
          rulesLinkButton.classList.remove(`rules__link--visible`);
          titleAnimation.destroyAnimation();
        } else {
          setTimeout(() => titleAnimation.runAnimation(), 0);
        }
      }
    }
  };

  const rulesScreenObserver = new MutationObserver(resetAnimation);
  rulesScreenObserver.observe(screenRules, {attributes: true});

  lastRulesItem.addEventListener(`animationstart`, () => {
    setTimeout(() => rulesLinkButton.classList.add(`rules__link--visible`), 233);
  });
};
