# Jumbotron components

## Loading

Any of the following will work:

```
import Jumbotron from '@devasatyam/controls/lib/Jumbotron';
import { Jumbotron } from '@devasatyam/controls';
```

## Usage

```
<Jumbotron>
  <h1>Important info</h1> not so much
</Jumbotron>
```

It adds a large frame with rounded corners to its contents.

## Attributes

Beyond the ones listed below, all other attributes will be passed on to the underlying `<div>` element.

### `color`

One of: `primary`, `secondary`, `info`, `warning`, `danger`, `light`, `white`, `dark`, determines the color of the text using the standard named colors.

### `background`

One of: `primary`, `secondary`, `info`, `warning`, `danger`, `light`, `white`, `dark`, determines the color of the background using the standard named colors.
