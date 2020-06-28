const COUNTER_TIME_STEP = 1 / 12 * 1000;
export default class PrizeCounter {
  constructor(element, counterContent = []) {
    this._element = element;
    this._counterContent = counterContent;
    this._isStarted = false;
    this._index = 0;
    this._requestId = null;
  }

  start() {
    if (!this._isStarted) {
      this._isStarted = true;
      const counterStarted = Date.now();
      let counterStepStart = counterStarted;

      const tick = () => {
        this._requestId = requestAnimationFrame(tick);
        const counterStepEnd = Date.now();

        if (counterStepEnd - counterStepStart > COUNTER_TIME_STEP) {
          this._updateElement(this._index);
          counterStepStart = counterStepEnd;
          this._index++;

          if (this._index >= this._counterContent.length) {
            this._resetCounter();
          }
        }
      };
      this._requestId = requestAnimationFrame(tick);
    }
  }

  _updateElement(index) {
    this._element.innerText = this._counterContent[index];
  }

  _resetCounter() {
    cancelAnimationFrame(this._requestId);
    this._isStarted = false;
    this._index = 0;
  }
}
