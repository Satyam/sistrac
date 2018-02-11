# Table component

## Loading

Any of the following will work:

```
import Table from '@devasatyam/controls/lib/Table';
import { Table } from '@devasatyam/controls';
```

## Usage

```
<Table hover dark>
  <thead>
    <tr>
      <th>#</th>
      <!-- ... -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xxx</td>
      <!-- ... -->
    </tr>
  </tbody>
</Table>
```

The `<Table>` component is just a wrapper for a `<table className="table">` element with attributes conveniently translated to the corresponding classNames from Bootstrap. As per Bootstrap, it is important that the headings and body are enclosed in explicit `<thead>` and `<tbody>` elements because they are used on the CSS selectors.

## Attributes

All of the attributes listed below are boolean, that is, their existence activates them, as shown in the example above. Any other attributes not listed below will simply be passed on to the underlying `<table>` element.

### `dark`

Turns the table to light text over dark background. Adds the `table-dark` className from Bootstrap.

### `striped`

Renders the table with alternating light and dark backgrounds. Adds the `table-striped` className from Bootstrap.

### `bordered`

Fully surrounds each cell with a thing border.

### `hover`

Highlights the rows as the cursor hovers over them.

### `small`

Makes the table more compact.

### _xx_`Responsive`

Will make the table scroll horizontally when the width of the table falls below the usual breakpoints of `xs`, `sm`, `md`, `lg`, `xl`. Thus, `smResponsive` adds the `table-responsive-sm` className.
