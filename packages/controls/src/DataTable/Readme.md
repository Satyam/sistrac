# DataTable component

## Loading

Any of the following will work:

```
import { DataTable, TableCol } from '@devasatyam/controls/lib/DataTable';
import DataTable from '@devasatyam/controls/lib/DataTable';
import DataTable from '@devasatyam/controls';
```

The first will provide separate `DataTable` and `TableCol` component, the last two will provide `DataTable` and `DataTable.Col` (`DataTable.TableCol` would have been redundant).

## Usage

```
<DataTable
  hover
  bordered
  data={[
    { id: 1, nombre: 'Jose', apellido: 'Perez' },
    { id: 2, nombre: 'Juan', apellido: 'Palomo' },
  ]}
  keyName="id"
>
  <caption>este es el caption</caption>
  <DataTable.Col
    name="nombre"
    label="Nombre"
    sortable
    format={(value, row) => <a href={row.id}>{value}</a>}
  />
  <DataTable.Col name="apellido" label="Apellido" />
</DataTable>
```

The `DataTable` component accepts the various formatting options described in the [Table](../Table/Readme.md) component plus the mandatories [`data`](#data) attribute containing the raw data to be displayed, and [`keyName`](#keyname) which refers to the name of the column containing the unique id for each row to be shown.

It can have as its child a standard `<caption>` element and one or more `<DataTable.Col>` components describing each of the columns of the table, as described below.

### `DataTable` attributes

#### `data`

It should contain an array of rows of data to be displayed, each row an object with the column names and their values. One of the columns should contain a unique identifier.

Values should be in internal format, numbers as such and not strings of number characters, dates as Date objects and so on, formatting them is done via [formatting](#format) functions.

#### `keyName`

The name of the column containing the unique id for each row.

#### `sortCompare`

A function to be used for sorting instead of the internal default sort function. The function will receive:

* `sortCol`: the name of the column to be sorted
* `a`: one of the rows whose values are to be compared
* `b`: the other row whose values are to be compared.

The function should return either 0 for equality, 1 for `a[sortCol] > b[sortCol]` or -1 for the opposite case.

The purpose of providing the whole rows is to make sorts of columns which are interdependent on one another. The default compare function is available as a static member of DataTable and can be used as shown below:

```
switch (sortCol) {
  case 'col1':
    // some complex comparison
    break;
  case 'col2':
    // some other complex multi-field comparison
    break;
  default:
    return DataTable.defaultCompare(sortCol, a, b);
}
```

Special comparison functions would be provided for columns `col1` and `col2` but for any other column, the default function can be called.

#### `sortCol`

The [`name`](#name) of the column the table is to be initially sorted by.

#### `sortDesc`

If true, the column named in [`sortCol`](#sortcol) will be sorted in reverse order.

#### `onRowClick`

A function that will be called when any cell in the table is clicked. It will be provided with

* `id`: the value of the column named in [`keyName`](#keyname) for the clicked row, which presumably should have been the unique identifier for the row.
* `ev`: the event object.

The function will be called even for cells containing anchor `<a>` elements so if this behavior is not desired, it is convenient to check whether `ev.target.nodeName === 'A'`.

For a finer control, the [`onCellClick`](#oncellclick) might be used.

#### Other

Any extra properties will be passed on to the resulting [Table](../Table/Readme.md) component.

### `DataTable.Col` attributes

#### `name`

The name of the property containing the value for this column within the [`data`](#data) array of objects.

#### `label`

The label to be shown in the heading for this column.

#### `headClassName`

Class name to be applied to the `<th>` elements

#### `className`, `style`

If present, they will be passed on to the `<td>` elements in the body of the table.

#### `format`

A function that will format the value for the cell. The function will receive:

* `value`: the value for the cell being formatted
* `row`: the full row of data in the table.

The function should return the value to be shown to the user.

Examples:

```
const formatDate = value => value.toLocaleString();
const formatLinked = (value, row) =>
  (<a href={`/xxxx/${row.id}`}>{value}</a>);
```

#### `sortable`

The column can be sorted. It will show a suitable icon on the left of the label and will respond to clicks by either sorting the table by this column or reversing the sort order.

#### `onCellClick`

A function that is called when the cell is clicked. It will receive:

* `colName`: The [`name`](#name) of the column clicked.
* `rowId`: The value of the [`keyName`](#keyname) column for the row clicked
* `value`: The value in the cell.
* `ev`: The event object.

The first two are meant to serve as the column and row coordinates to where the click occurred.
