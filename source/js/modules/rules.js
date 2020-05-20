import AnimatedTypography from './animated-typography';

export default () => {
  const titleAnimation =
    new AnimatedTypography(`.rules__title`, 300, `active`, `transform`, false);
  const lastRulesItem = document.querySelector(`.rules__item:last-child`);
  const rulesLinkButton = document.querySelector(`.rules__link`);
  const screenRules = document.querySelector(`.screen--rules`);

  titleAnimation.init();
  setTimeout(() => titleAnimation.runAnimation(), 0);


  const hideRulesLinkButton = (mutationList) => {
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

  const rulesScreenObserver = new MutationObserver(hideRulesLinkButton);
  rulesScreenObserver.observe(screenRules, {attributes: true});

  lastRulesItem.addEventListener(`animationstart`, () => {
    setTimeout(() => rulesLinkButton.classList.add(`rules__link--visible`), 233);
  });
};


// export default () => {
//   const screenIntro = document.querySelector(`.screen--intro`);

//   const headerAnimation =
//     new AnimatedTypography(`.intro__title`, 500, `active`, `transform`);
//   const dateAnimation =
//     new AnimatedTypography(`.intro__date`, 300, `active`, `transform`, false);

//   headerAnimation.init();
//   dateAnimation.init();

//   const destroyHeaderAnimation = (mutationList) => {
//     for (let mutation of mutationList) {
//       if (mutation.type === `attributes` && mutation.attributeName === `class`) {
//         if (!mutation.target.classList.contains(`active`)) {
//           headerAnimation.destroyAnimation();
//           dateAnimation.destroyAnimation();
//         } else {
//           setTimeout(() => headerAnimation.runAnimation(), 300);
//           setTimeout(() => dateAnimation.runAnimation(), 1667);
//         }
//       }
//     }
//   };

//   const introScreenObserver = new MutationObserver(destroyHeaderAnimation);
//   introScreenObserver.observe(screenIntro, {attributes: true});

//   setTimeout(() => headerAnimation.runAnimation(), 300);
//   setTimeout(() => dateAnimation.runAnimation(), 1667);
// };

