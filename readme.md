# Happy focus

> Make Chrome and IE responsibly lose focus when the user is clicking inputs

Once you style `button`s or `input`s away from their defaults, the `:focus` state and its styles will show and retain **on click** in all recent Chrome versions or IE >= 9. In IE9 specifically, default `:focus` styles even show when not applying custom styles. And then your designer will complain about this. :wink:

## Solution

**Happy focus!** :sunglasses:

_A small script that responsibly removes focus after a click._

[GitHub](https://github.com/jelmerdemaat/happy-focus) | [NPM](https://www.npmjs.com/package/happy-focus) | [@jelmerdemaat](https://twitter.com/jelmerdemaat)

Try here: [jelmerdemaat.github.io/happy-focus](https://jelmerdemaat.github.io/happy-focus/). In the first example the red border (or any other style you give it) is
visible in said browsers on click as well as when using the
keyboard to navigate. In the second example, this behaviour is responsibly fixed:

  1. Detect if the event was solely a `click`, or a `keydown` followed by a `click`
  2. If the event is a single `click`
  3. Wait one `requestAnimationFrame`, needed to correctly `blur()` in Chrome
  2. `blur()` the currently clicked element

## Install
### Directly
Include `happyfocus(.min).js` somewhere  in your document, before the rest of your JavaScript where you initiate this script.

### Via npm
```sh
npm install --save happy-focus
```

## Usage
In your JavaScript:

```js
// When using an npm based build process, import the module:
import HappyFocus from 'happy-focus';

// Create an instance of HappyFocus
const happyfocus = new HappyFocus();

// Optionally, pass a querySelectorAll string
// or array of querySelectorAll strings.
// Defaults to:
//   'input[type="radio"], input[type="checkbox"], button:not([type="submit"])';

const customhappyfocus = new HappyFocus([
  'input[type="checkbox"]',
  'button'
]);

// Done!
```

## Accessibility
When using the keyboard, all normal focussing and blurring functionality is retained. Yeay for keyboard users! :heart:

It is advised **not** the use this script on `type="submit"` inputs or buttons, as it breaks native form validation.

## Browser support
This little script (888B minified, 416B gzipped) is supported in all browsers that support `Element.matches()` (either prefixed or not) and `requestAnimationFrame`. Which is a lot: [caniuse.com/#feat=matchesselector,queryselector](https://caniuse.com/#feat=matchesselector,queryselector)

Can I Use screenshots:

### matches()
![Element.matches support](http://i.imgur.com/FuR0x2G.png)

### requestAnimationFrame()
![requestAnimationFrame support](http://i.imgur.com/QHDgRhr.png)
