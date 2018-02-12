# NavBar components

## Loading

Any of the following will work:

```
import { NavBar, Menu, Item, Dropdown, DropdownItem } from '@devasatyam/controls/lib/NavBar';
import NavBar from '@devasatyam/controls/lib/NavBar';
import { NavBar } from '@devasatyam/controls';
```

The first will provide separate `NavBar`, `Menu`, `Item`, `Dropdown`, `DropdownItem` components, the last two will provide `NavBar` and `NavBar.Menu`, `NavBar.Item`, `NavBar.Dropdown`, `NavBar.DropdownItem`.

## Usage

```
<NavBar brand="My Brand" href="myBrand.com">

  <NavBar.Menu>
    <NavBar.Item href="/menu1">Menu 1</NavBar.Item>
    <NavBar.Item href="/menu2" disabled>
      Menu 2
    </NavBar.Item>

    <NavBar.Dropdown label="drpdwn">
      <NavBar.DropdownItem href="item1">item 1</NavBar.DropdownItem>
      <NavBar.DropdownItem href="item2">item 2</NavBar.DropdownItem>
      <NavBar.DropdownItem href="item3">item 3</NavBar.DropdownItem>
    </NavBar.Dropdown>
  </NavBar.Menu>

  <NavBar.Menu right>
    <NavBar.Dropdown label="drpdwnR">
      <NavBar.DropdownItem href="item21">item 21</NavBar.DropdownItem>
      <NavBar.DropdownItem href="item22" disabled>
        item 22
      </NavBar.DropdownItem>
      <NavBar.DropdownItem href="item23">item 23</NavBar.DropdownItem>
    </NavBar.Dropdown>
  </NavBar.Menu>

</NavBar>
```

A `NavBar` will create a band containing navigation options.

The `NavBar` will collapse on a small screen so that only the brand and the expand icon will be visible.

It may have a brand identifying the application, which can be a link, usually to the home page, plus menus either aligned left or right. Each menu may be composed of one or more buttons or dropdowns containing menu options. Each of those must contain links either to internal routes (handled by `Link` elements of `react-router`) or external links elsewhere.

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

#### `dark`

Indicates the shade of the background. If present, the text of the options will show in white, expected to contrast against a dark background.

#### `brackground`

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

A function that will be called when the [`brand`](#brand) is clicked. It will only work if not [`href`](#href) is present.
