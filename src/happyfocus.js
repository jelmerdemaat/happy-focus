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

// "Class" HappyFocus definition
function HappyFocus(elements) {
  // "elements" can be a string selector, or if it's an array, we make
  // it a string selector
  if (elements && typeof elements !== 'string') {
    elements = elements.join(',');
  }

  // These are the default elements the class is initiated with.
  // Configureable by passing a selector to the new instance
  this.elements =
    elements ||
    'input[type="radio"],' +
      'input[type="checkbox"],' +
      'input[type="submit"],' +
      'button';

  this.prevEventType = 'click';

  // Attach the base event handlers
  document.addEventListener('click', this.onClick.bind(this), false);
  document.addEventListener('keydown', this.onClick.bind(this), false);
}

// Onclick handler (also runs on keydown, must be this way because otherwise
// the difference cannot be measured)
HappyFocus.prototype.onClick = function(evt) {
  // An event is needed
  if (!evt) {
    return;
  }

  // If the event target matches the given selector,
  // AND if it's a click event,
  // AND if the previous event was NOT a keydown (which means it's really
  // a user making a mouse click)
  if (
    evt.target.matches(this.elements) &&
    evt.type === 'click' &&
    this.prevEventType !== 'keydown'
  ) {
    // We need one requestAnimationFrame of waiting time, because otherwise
    // Chrome will not let go of the :focus state
    requestAnimationFrame(function() {
      // Blur the current target. After this, the "tab" key still moves to
      // the next element in line (not the first in the document)
      evt.target.blur();
    });
  }

  // Remember the previous event type to be able to distinguish between
  // keyboard and mouse clicks
  this.prevEventType = evt.type;
};

// UMD module definition
// Roughly taken from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
if (typeof define === 'function' && define.amd) {
  // AMD. Register as an anonymous module.
  define([], HappyFocus);
} else if (typeof module === 'object' && module.exports) {
  // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  module.exports = HappyFocus;
} else {
  // Browser globals (root is window)
  window.HappyFocus = HappyFocus;
}
