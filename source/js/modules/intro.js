import AnimatedTypography from './animated-typography';

export default () => {
  const screenIntro = document.querySelector(`.screen--intro`);

  const headerAnimation =
    new AnimatedTypography(`.intro__title`, 250, `active`, `transform`);
  const dateAnimation =
    new AnimatedTypography(`.intro__date`, 200, `active`, `transform`, false);

  headerAnimation.init();
  dateAnimation.init();

  const resetAnimation = (mutationList) => {
    for (let mutation of mutationList) {
      if (mutation.type === `attributes` && mutation.attributeName === `class`) {
        if (!mutation.target.classList.contains(`active`)) {
          headerAnimation.destroyAnimation();
          dateAnimation.destroyAnimation();
        } else {
          setTimeout(() => headerAnimation.runAnimation(), 300);
          setTimeout(() => dateAnimation.runAnimation(), 1667);
        }
      }
    }
  };

  const introScreenObserver = new MutationObserver(resetAnimation);
  introScreenObserver.observe(screenIntro, {attributes: true});

  setTimeout(() => headerAnimation.runAnimation(), 300);
  setTimeout(() => dateAnimation.runAnimation(), 1667);
};
