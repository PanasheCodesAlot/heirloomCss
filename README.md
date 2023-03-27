
# HeirloomCss

HeirloomCss is a JavaScript library that allows CSS selectors to inherit properties from other selectors. It introduces a CSS variable called '--inherit' that allows developers to define which selectors a given selector should inherit properties from. It also provides options to exclude certain properties or inherit only specific properties. This makes CSS styling more efficient and flexible, as developers can reuse properties across multiple selectors without duplicating code.


## Documentation

### Installation

To use Heirloom CSS, you can include it in your project using a script tag:

```html
<script src="path/to/heirloom.css"></script>
```

### Usage

To use Heirloom CSS, simply add the ```--inherit``` variable to a CSS selector and define the selectors from which it should inherit properties, separated by commas and enclosed in quotes. To exclude some properties, add a ```--receed``` variable and define the CSS property names that should not be inherited, separated by commas and enclosed in quotes. To inherit specific properties only, use ```--dominant``` and define the properties that should be inherited, separated by commas and enclosed in quotes.

Here is an example of how to use Heirloom CSS:

```css
/* Define a base selector */
.base {
  color: red;
  font-size: 16px;
}

/* Define a selector that inherits from the base selector */
.inherit {
  --inherit: '.base';
  background-color: blue;
}

/* Define a selector that excludes some properties from the inherited selector */
.exclude {
  --inherit: '.base';
  --receed: 'color';
  background-color: green;
}

/* Define a selector that inherits specific properties only */
.dominant {
  --inherit: '.base';
  --dominant: 'font-size';
  background-color: yellow;
}

```

In the above example, the ```.inherit``` selector will inherit all properties from the ```.base``` selector, including the color and font-size properties, and also add its own background-color property. The ```exclude``` selector will inherit all properties from the ```.base``` selector except for the color property, and add its own background-color property. The ```.dominant``` selector will inherit only the font-size property from the ```.base``` selector, and add its own background-color property.

## Comapatibility

### Chrome
 v26
### Edge
 v12
### Firefox
 v14
### Opera
 v15
### Safari
 v7
### Chrome Android
 v26
### Firefox for Android
 v14
### Opera Android
 v26

## Why HeirloomCss?

HeirloomCss allows developers to inherit properties from other selectors, making it easy to reuse styles across multiple selectors without duplicating code. This makes styling more efficient and reduces the chances of errors or inconsistencies

HeirloomCss provides developers with the ability to exclude some properties or inherit only specific properties, giving them more control over how styles are applied to their web pages.

HeirloomCss is easy to use and integrates seamlessly with existing CSS code. Developers can simply add the --inherit variable to a selector and define the selectors from which it should inherit properties, making it a simple and straightforward process.

By using HeirloomCss, developers can keep their CSS code organized and maintainable, as styles are grouped together in a single selector rather than being scattered across multiple selectors.
