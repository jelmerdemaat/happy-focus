# Happy focus

> Make Chrome and IE responsibly lose focus when the user is clicking inputs

Once you style `button`s or `input`s away from their defaults, the `:focus` state and its styles will show and retain **on click** in all recent Chrome versions or IE >= 9. In IE9 specifically, default `:focus` styles even show when not applying custom styles. And then your designer will complain about this. :wink:

## Solution

**Happy focus!** :sunglasses:

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
import HappyFocus from 'happy-focus';

const happyfocus = new HappyFocus();

// Optionally, pass a querySelectorAll string
// or array of querySelectorAll strings

const customhappyfocus = new HappyFocus([
  'input[type="submit"]',
  'button'
]);

// Done!
```

## Accessibility
When using the keyboard, all normal focussing and blurring functionality is retained. Yeay for keyboard users! :heart:

## Browser support
This little script (1.6K minified, 752B gzipped) is supported in all browsers that support `document.querySelectorAll` and `requestAnimationFrame`. Which is a lot: [caniuse.com/#feat=requestanimationframe,queryselector](https://caniuse.com/#feat=requestanimationframe,queryselector)

### querySelectorAll
![querySelectorAll support](http://i.imgur.com/2haAkyy.png)

### requestAnimationFrame
![requestAnimationFrame](http://i.imgur.com/QHDgRhr.png)
