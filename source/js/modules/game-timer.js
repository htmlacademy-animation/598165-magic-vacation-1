const TIMER_TIME_STEP = 1000;

export default class Timer {
  constructor(element, totalDuration, callback = () => {}) {
    this._element = element;
    this._minutesElement = this._element.querySelectorAll(`span`)[0];
    this._secondsElement = this._element.querySelectorAll(`span`)[1];
    this._totalDuration = totalDuration;
    this._callback = callback;

    this._isStarted = false;

    this._requestId = null;
  }

  start() {
    if (!this._isStarted) {
      this._isStarted = true;
      const countdownStarted = Date.now();
      let timerStepStart = countdownStarted;

      const tick = () => {
        this._requestId = requestAnimationFrame(tick);
        const timerStepEnd = Date.now();

        if (timerStepEnd - timerStepStart > TIMER_TIME_STEP) {
          const timeElapsed = Math.floor((Date.now() - countdownStarted) / TIMER_TIME_STEP);
          const timeLeft = this._totalDuration - timeElapsed;
          this._updateTimer(timeLeft);
          timerStepStart = timerStepEnd;

          if (timeLeft <= 0) {
            this._stopTimer();
          }
        }
      };
      this._requestId = requestAnimationFrame(tick);
    }
  }

  _updateTimer(timeLeft) {
    this._minutesElement.innerHTML = this._formatTime(timeLeft).minutes;
    this._secondsElement.innerHTML = this._formatTime(timeLeft).seconds;
  }

  _formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return {
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds
    };
  }

  _stopTimer() {
    cancelAnimationFrame(this._requestId);
    this._isStarted = false;
    this._updateTimer(this._totalDuration);
    this._callback();
  }

}
