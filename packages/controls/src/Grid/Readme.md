# Grid, Row and Col components

## Loading

Any of the following will work:

```
import { Grid, Row, Col } from '@devasatyam/controls/lib/Grid';
import { Grid, Row, Col } from '@devasatyam/controls';
```

## Usage

```
<Grid>
  <Row>
    <Col xs={12} md={8}>
       whatever
    </Col>
    <Col xs={6} md={4}>
      ...
    </Col>
  </Row>

  <Row>
    <Col xs={6} xsOffset={6}>
      ...
    </Col>
  </Row>

  <Row>
    <Col xs={12} lgOffset={2} lg={8}>
      ...
    </Col>
  </Row>

</Grid>
```

An outer `<Grid>` component is required to enclose the rest of the definitions. A single `<Grid>` on the outermost element of the application is enough as `<Row>` components are not required to be immediately under it, there can be all sorts of other contents in between.

Each row is enclosed in a `<Row>` component which contains definitions for one or more columns with the `<Col>` component. A row is 12 equal units. Each column may take any number of these unit cells. A row may be broken into several rows if the units taken by its columns exceeds 12.

The number of units taken by each column may vary depending on the total size available. For smaller devices, each column may take more units, with the rest of the columns in the row spilling into the next line.

In the first example above, the two columns will take 8 and 4 columns respectively on a single row for screen sizes of medium size and above (≥768px wide) but it will break down into two lines for smaller screens as the first column already takes all of the 12 units for extra-small (xs which is anything less than 576px wide).

The second example will show its content on the right half of the screen, as the column only uses 6 of the 12 available units but it is offset by another 6 units.

In the last example, the contents will be show centered in large (lg) screens using 8 units starting 2 units from the left edge, leaving another 2 columns to the right (leftover space does not need to be specified), however, the content will occupy the whole width of the device for smaller devices.

## `Grid`

The `Grid` element sets the outer frame for the whole grid system. Only one needs to be present in the whole application, thus, it can be set on the outermost component for the whole of it. Nesting one grid within a grid cell does not require an extra `<Grid>` element.

### `fixed` attribute

By default, a grid will use as much space as available, however, if has to be restricted to a particular width, the `fixed` boolean attribute can be given.

### `className`

This is the only other attribute the `<Grid>` component will take.

## `Row`

Starts the definition of a row. It has the following special attributes, all attributes will be passed on untouched.

### `vAlign`

Can be one of `top`, `middle`, `bottom`, if the height of the row is larger than that of the content, the contents will be aligned as described by the argument.

### `justify`

Can be one of:

* `left`: items will be justified to the left, leaving the extra space to the right
* `center`: items will be centered next to one another with all free space evenly distributed on either side.
* `right`: items will be justified right, extra space on the left.
* `even`: items will be distributed evenly across with extra space evenly distributed around and in between the contents
* `between`: items will be justified on either edge with all free space evenly distributed in between them.

## `Col`

It encloses the content to be laid out by the grid.

Most of the attributes are composed of two parts, a breakpoint and an option.

### Breakpoints

The breakpoint codes signal the size of the screen above which the given size of option applies. A larger breakpoint definition overrides the smaller ones.

The breakpoints are:

* `xs` extra-small, in practice, it applies to all screen sizes
* `sm` small, 576px
* `md` medium, 768px
* `lg` large, 992px
* `xl` extra-large, 1200px

### Options:

* _none_: If no option is given, it gives the number of units the column will span.
* `Offset`: The number of units the column is to be offset from the left margin.
* `Order`: The actual position, in units, the column is going to occupy. It allows the columns to be laid out in an order different from that in which are defined, usually depending on the space available.
* `HideBelow` if the screen size falls below the given size, hide this column.
* `HideAbove` If the screen size is larger than the given size, hide this column.

### `vAlign`

If the contents of the column does not take the whole height of the row, it can be aligned either `top`, `middle` or `bottom`.
