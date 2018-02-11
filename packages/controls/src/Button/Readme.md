# Button and ButtonGroup components

## Loading

Any of the following will work:

```
import { Button, ButtonGroup } from '@devasatyam/controls/lib/Button';
import { Button, ButtonGroup } from '@devasatyam/controls';
```

## Usage

```
<Button>plain</Button>
<Button color="secondary">secondary</Button>
<Button color="secondary" active>
  secondary active
</Button>
<Button color="secondary" toggle>
  secondary toggle
</Button>
<Button color="primary">primary</Button>
<Button href="algo" color="info">
  href, info
</Button>
<Button color="warning" outline>
  warning, outline
</Button>
<Button disabled>disabled</Button>
<Button size="sm">sm</Button>
<hr />

<ButtonGroup
  color="primary"
  outline
  toggle
  onToggle={name => console.log(name)}
>
  <Button name="uno">uno</Button>
  <Button name="dos">dos</Button>
  <Button name="tres">tres</Button>
</ButtonGroup>
```

## `Button` component

Renders a simple `<button>` or, if the [`href`](#href) attribute is present, a `react-router` `<Link>` component. Visually they look the same.

### Attributes

Beyond the attributes listed below, any other attribute provided will simply be passed on to the underlying `<button>` element.

#### `color`

One of the standard Bootstrap colors, namely: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`. The `link` color makes the button look like a link, but does not change its behavior.

#### `size`

One of:

* `sm`: makes the button smaller than normal
* `lg`: makes the button larger than normal
* `block`: widens the button to take all the available width.

#### `outline`

Makes the button hollow by using a transparent background with a colored border.

#### `disabled`

Dims the button and makes it unresponsive to clicks

#### `toggle`

Turns the button into a two-state toggle button. It requires setting the [`color`](#color) attribute as there is no perceptible change with the default color. Using [`outline`](#outline) is even better. It will change colors depending on the state and it will fire the [`onToggle`](#ontoggle) event.

#### `active`

Whether a [`toggle`](#toggle) button is active or not.

#### `onToggle`

Function to be called when the button toggles by clicking on it. The function receives:

* `active`: the new state of the [`active`](#active) property
* `name`: the [`name`](#b-name) given to the button, useful if several toggle buttons are handled by the same function.
* `ev`: the event object.

It will only be called on buttons with the [`toggle`](#toggle) attribute set. It does not preclude the regular `onClick` listener from being called, if present.

<a name="b-name"></a>

#### `name`

A string to be assigned to the `name` HTML attribute. Useful in the [`onToggle`](#ontoggle) method.

#### `href`

Turns the button from an actual `<button>` element into a `<Link>` component from `react-router`. It does not change the look of the button.

## `ButtonGroup` component

Allows grouping several [`Button`](#button) components together. If the [`toggle`](#bg-toggle) attribute is present, the [`onToggle`](#bg-ontoggle) function will be called, if present.

The `ButtonGroup` component only accepts [`Button`](#button) components.

<a name="bg-toggle" ></a>

### `toggle`

Turns the `ButtonGroup` into a set of mutually exclusive pushbuttons. Only one of them will be active at a time.

If [`onToggle`](#bg-ontoggle) is set, it will be called. For visual reasons, [`outline`](#outline) buttons are visually better.

<a name="bg-ontoggle"></a>

### `onToggle`

A function to be called when the active button changes in a toggled group. The function will receive:

* `name`: the [`name`](#b-name) attribute provided to the button currently active.
* `ev`: the regular event object.

### `active`

The [`name`](#b-name) of the button that should initially be active.

### Other

If other attributes are given, such as [`color`](#color) or [`size`](#size), they will be passed on to each of the children, unless overridden by the child, thus providing a consistent look.
