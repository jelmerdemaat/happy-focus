'use strict';

// Prefix the Element.matches() method for older browsers (old Edge, IE11,
// Android Browser)

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Element.prototype.matches = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

var HappyFocus = function () {
  function HappyFocus(elements) {
    _classCallCheck(this, HappyFocus);

    if (elements && typeof elements !== 'string') {
      elements = elements.join(',');
    }

    this.elements = elements || 'input[type="radio"],' + 'input[type="checkbox"],' + 'input[type="submit"],' + 'button';

    this.prevEventType = 'click';

    this.onClick = this.onClick.bind(this);

    this.attachHandlers();
  }

  _createClass(HappyFocus, [{
    key: 'attachHandlers',
    value: function attachHandlers() {
      document.addEventListener('click', this.onClick, false);
      document.addEventListener('keydown', this.onClick, false);
    }
  }, {
    key: 'onClick',
    value: function onClick(evt) {
      if (evt.target.matches(this.elements) && evt.type === 'click' && this.prevEventType !== 'keydown') {
        requestAnimationFrame(function () {
          evt.target.blur();
        });
      }

      this.prevEventType = evt.type;
    }
  }]);

  return HappyFocus;
}();

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = HappyFocus;
  }
  exports.HappyFocus = HappyFocus;
} else {
  window.HappyFocus = HappyFocus;
}

//# sourceMappingURL=happyfocus.js.map