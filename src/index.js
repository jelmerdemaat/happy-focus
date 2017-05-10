'use strict';

class HappyFocus {
  constructor(elements) {
    if (elements && typeof elements !== 'string') {
      elements = elements.join(',');
    }

    this.elements =
      elements ||
      'input[type="radio"],' +
        'input[type="checkbox"],' +
        'input[type="submit"],' +
        'button';

    this.prevEventType = 'click';

    this.onClick = this.onClick.bind(this);

    this.attachHandlers();
  }

  attachHandlers() {
    [].slice.call(document.querySelectorAll(this.elements)).forEach(input => {
      input.addEventListener('click', this.onClick, false);
      input.addEventListener('keydown', this.onClick, false);
    });
  }

  onClick(evt) {
    if (evt.type === 'click' && this.prevEventType !== 'keydown') {
      requestAnimationFrame(() => {
        evt.target.blur();
      });
    }

    this.prevEventType = evt.type;
  }
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = HappyFocus;
  }
  exports.HappyFocus = HappyFocus;
} else {
  window.HappyFocus = HappyFocus;
}
