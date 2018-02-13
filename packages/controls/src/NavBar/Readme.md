# NavBar components

## Loading

Any of the following will work:

```
import { NavBar, Group, Button, Menu, Item } from '@devasatyam/controls/lib/NavBar';
import NavBar from '@devasatyam/controls/lib/NavBar';
import { NavBar } from '@devasatyam/controls';
```

The first will provide separate `NavBar`, `Group`, `Button`, `Menu`, `Item` components, the last two will provide `NavBar` and `NavBar.Group`, `NavBar.Button`, `NavBar.Menu`, `NavBar.Item`.

## Usage

```
<NavBar brand="My Brand" href="myBrand.com">

  <NavBar.Group>
    <NavBar.Button href="/menu1">Menu 1</NavBar.Button>
    <NavBar.Button href="/menu2" disabled>
      Menu 2
    </NavBar.Button>

    <NavBar.Menu label="drpdwn">
      <NavBar.Item href="item1">item 1</NavBar.Item>
      <NavBar.Item href="item2">item 2</NavBar.Item>
      <NavBar.Item href="item3">item 3</NavBar.Item>
    </NavBar.Menu>
  </NavBar.Group>

  <NavBar.Group right>
    <NavBar.Menu label="drpdwnR">
      <NavBar.Item href="item21">item 21</NavBar.Item>
      <NavBar.Item href="item22" disabled>
        item 22
      </NavBar.Item>
      <NavBar.Item href="item23">item 23</NavBar.Item>
    </NavBar.Menu>
  </NavBar.Group>

</NavBar>
```

A `NavBar` will create a band containing navigation options.

The `NavBar` will collapse on a small screen so that only the brand and the expand icon will be visible.

It may have a brand identifying the application, which can be a link, usually to the home page, plus menus either aligned left or right. Each menu may be composed of one or more buttons or dropdowns containing menu options. Each of those must contain links either to internal routes (handled by `Link` elements of `react-router`) or external links elsewhere.

A NavBar may have one or more `NavBar.Group` children which will groups the various navigation options. By default, the group is left-justified, next to the brand. A group can be right-justified.

Each group may have one or more `NavBar.Button` and `NavBar.Menu`. The later is a dropdown-style menu which can have any number of `NavBar.Item`s.

## NavBar

#### `position`

One of `top`, `bottom` or `sticky-top`, it defaults to the navigation bar inserted in the normal flow of layout. It can be either fixed to the very top, the very bottom of the page or it can stick to the top of the screen, with the page scrolling underneath.

Since the NavBar floats above the page, it is important to set some margin or padding for the container underneath, so that it doesn't get hidden by the bar.

```
<div style={{ paddingTop: '4em' }}>
  <NavBar
    position="top"
    ....
```

The NavBar will float above the padding in the container. For NavBars positioned at the bottom, the padding should be on that end.

#### `dark`

Indicates the shade of the background. If present, the text of the options will show in white, expected to contrast against a dark background.

#### `background`

One of: `primary`, `secondary`, `info`, `warning`, `danger`, `light`, `white`, `dark`, determines the color of the background using the standard named colors.

#### `breakpoint`

One of `sm`, `md`, `lg` or `xl`, determines at which point the NavBar switches from its expanded to its collapsed form, to save space on smaller screens.

#### `brand`

The text to be shown highlighted on the left-hand edge of the bar. This, along the expand icon (the 'hamburger') will be the only elements visible when the NavBar is collapsed.

Instead of text, it may take JSX:

```
<NavBar brand="<div><svg>....</svg> some text</div>"
```

#### `href`

An address to navigate to when the [`brand`](#brand) is clicked.

#### `external`

Signal whether the [`href`](#href) is an internal link, using a `<Link>` component from `react-router` or an anchor `<a>` when `external` is present.

#### `onClick`

A function that will be called when the [`brand`](#brand) is clicked. It will not work if [`href`](#href) is present.

## `NavBar.Group`

Provides a container for any number of [`NavBar.Button`](#navbar_button) buttons or [`NavBar.Menu`](#navbar_menu) dropdown menus.

### Attributes

Only one attribute:

#### `right`

If true, the group will be right-justified.

## `NavBar.Button`

Provides a simple item that responds to clicks. The contents of this tag is displayed as its children.

### Attributes

#### `href`

An address to navigate to when the button is clicked.

#### `external`

Signal whether the [`href`](#href) is an internal link, using a `<Link>` component from `react-router` or an anchor `<a>` when `external` is present.

#### `onClick`

A function that will be called when the button is clicked. It will not work if [`href`](#href) is present.

#### `disabled`

The button will be grayed out and will not respond to clicks.

#### `className`

As expected...

## `NavBar.Menu`

Creates a dropdown menu filled with [`Menu.Item`](#menu_item) components.

### Attributes

#### `label`

The label to be shown to the user. It can be a simple text or a fragment of JSX.

#### `disabled`, `className`

As expected.

## `NavBar.Item`

Pretty much like [`NavBar.Button`](#navbar_button) but folded within a dropdown menu.

### Attributes

The same as [`NavBar.Button`](#navbar_button).
