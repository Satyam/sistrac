# NavBar components

## Loading

Any of the following will work:

```
import { NavBar, Group, Button, Menu, Item, Search, Divider } from '@devasatyam/controls/lib/NavBar';
import NavBar from '@devasatyam/controls/lib/NavBar';
import { NavBar } from '@devasatyam/controls';
```

The first will provide separate `NavBar`, `Group`, `Button`, `Menu`, `Item`, `Search` and `Divider` components, the last two will provide `NavBar` and `NavBar.Group`, `NavBar.Button`, `NavBar.Menu`, `NavBar.Item`, `NavBar.Search` and `NavBar.Divider`.

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
      <NavBar.Divider />
      <NavBar.Item href="item3">item 3</NavBar.Item>
    </NavBar.Menu>
  </NavBar.Group>

  <NavBar.Group right>
  <NavBar.Search onSearch={handleSearch}>
    Search
  </NavBar.Search>
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

A NavBar may have one or more [`NavBar.Group`](#navbargroup) children which will groups the various navigation options. By default, the group is left-justified, next to the brand. A group can be right-justified.

Each group may have one or more:

* [`NavBar.Button`](#navbarbutton) a clickable element.
* [`NavBar.Menu`](#navbarmenu) a dropdown-style menu which can have any number of [`NavBar.Item`](#navbaritem)s and possibly [`NavBar.Divider`](#navbardivider)s.
* [`NavBar.Search`](#navbarsearch) A simple search form made of an input box and a button.

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

Provides a container for any number of [`NavBar.Button`](#navbarbutton) buttons or [`NavBar.Menu`](#navbarmenu) dropdown menus.

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

Creates a dropdown menu filled with [`Menu.Item`](#menuitem) components.

### Attributes

#### `label`

The label to be shown to the user. It can be a simple text or a fragment of JSX.

#### `disabled`, `className`

As expected.

## `NavBar.Item`

Pretty much like [`NavBar.Button`](#navbarbutton) but folded within a dropdown menu.

### Attributes

The same as [`NavBar.Button`](#navbarbutton).

## `NavBar.Divider`

It draws a simple line across the expanded menu, to separate items.

### Attributes

It passes all the attribute it gets to the underlying element, but hardly any will be of any use since it can hold no visible content.

## `NavBar.Search`

Renders a simple input box with an attached action button. Though it can be used for any sort of textual entry from the NavBar, it is mostly mean to provide a search box, thus the name.

The contents of the component provide the label for the pushbutton, it can be text, an icon or any JSX.

### Attributes

#### `placeholder`

Placeholder text to be shown in the input box when empty.

#### `onSearch`

Function to be called when the button is clicked. It receives:

* `value`: the text from the input box
* `ev`: the event object.

#### `color`

One of the standard Bootstrap colors to be applied to the button.

#### `outline`

If present, the button will be outlined instead of filled.

#### `className`

A className that applies to the `form` element that encloses the input box and button.

#### `btnClassName`

A className that applies to the button, beyond color and outline.

#### `inputClassName`

A className that applies to the input box.
