'use strict';

// Prefix the Element.matches() method for older browsers (old Edge, IE11,
// Android Browser)
Element.prototype.matches =
  Element.prototype.matches ||
  Element.prototype.matchesSelector ||
  Element.prototype.mozMatchesSelector ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.oMatchesSelector ||
  Element.prototype.webkitMatchesSelector;

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
    document.addEventListener('click', this.onClick, false);
    document.addEventListener('keydown', this.onClick, false);
  }

  onClick(evt) {
    if (
      evt.target.matches(this.elements) &&
      evt.type === 'click' &&
      this.prevEventType !== 'keydown'
    ) {
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
