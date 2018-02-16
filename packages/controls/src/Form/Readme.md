# Form components

## Loading

Any of the following will work:

```
import { Form, Field, Option, Label, Help } from '@devasatyam/controls/lib/Form';
import Form from '@devasatyam/controls/lib/Form';
import { Form } from '@devasatyam/controls';
```

The first will provide separate `Form`, `Field`, `Option`, `Label`and `Help` components, the last two will provide `Form`, `Form.Field`, `Form.Option`, `Form.Label` and `Form.Help`.

## Setup

The Redux store that Redux Forms will use has to be initialized with the corresponding reducer:

```
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';

const store = createStore(
  combineReducers({
    form: formReducer,
    // ... Other reducers
  }),
  // suggested, for debugging:
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
```

Elsewhere, the `Provider` wrapper should be added to create the context for Redux to be available:

```
ReactDOM.render(
  <Provider store={store}>
    ...
  </Provider>,
  document.getElementById('root'),
);
```

## Usage

```
<Form
  name="prueba"
  initialValues={{
    text: 'initial text',
    checkbox: true,
    group: 2,
    select: '3',
  }}
  validate={validate}
  onSubmit={handleSubmit}
>
  <Form.Field type="text" name="text">
    <Form.Label>Label for text</Form.Label>
    <Form.Help>help text</Form.Help>
  </Form.Field>
  <Form.Field type="checkbox" name="checkbox" placeholder="whatever">
    <Form.Label>Label for checkbox</Form.Label>
    <Form.Help>help checkbox</Form.Help>
  </Form.Field>
  <Form.Field type="radio" name="group" parser={Number} format={String}>
    <Form.Label>Options group:</Form.Label>
    <Form.Option value={1}>one</Form.Option>
    <Form.Option value={2}>two</Form.Option>
    <Form.Option value={3}>three</Form.Option>
    <Form.Help>help group</Form.Help>
  </Form.Field>
  <Form.Field type="select" name="select">
    <Form.Label>Options select:</Form.Label>
    <Form.Option value="1">one</Form.Option>
    <Form.Option value="2">two</Form.Option>
    <Form.Option value="3">three</Form.Option>
    <Form.Help>help select</Form.Help>
  </Form.Field>
  <Form.Field type="buttonGroup" name="buttonGroup">
    <Button type="submit" color="primary">
      Ok
    </Button>
    <Button type="reset">Reset</Button>
  </Form.Field>
</Form>
```

A [`Form`](#form) encloses any number of [`Form.Field`](#formfield) components of various types. A `Form` must have a unique application-wide `name` attribute and will usually have an `onSubmit` calback.

## `Form`

The `Form` component is a wrapper around the Redux Forms [`reduxForm`](https://redux-form.com/7.2.2/docs/api/reduxform.md/) object. All properties listed in the documentation are valid, except for `form` which has been renamed `name` for the sake of consistency.

### `name`

The name of this form. It will be used for the sub-store where the data of this form will be stored, so it has to be unique for the whole application. It is the equivalent to the `form` property in the original documentation.

### `onSubmit`

A function that will be called to submit the form. The [documentation](https://redux-form.com/7.2.2/docs/api/reduxform.md/#-code-onsubmit-function-code-optional-) provides further details. Basically, the function will receive:

* `values`: an object with the values of the fields
* `dispatch`: Redux `dispatch` function so that actions can be dispatched directly.

The function may return a Promise so that the form submission remains pending until resolved. An error will result if the promise is rejected.

### `initialValues`

Object listing the initial values for the named fields.

### `validate`

A function that will be called every time any field is changed. It will receive an object with the current values of the fields and must return an object with the error messages for each of the named fields that failed the validation, or an empty object if there was no error.

Since a field halfway into being typed might be in error, no errors are displayed until the focus on the field is loss, either by passing to another field or to the submit button.

### Others

As mentioned, all other properties of the [`reduxForm`](https://redux-form.com/7.2.2/docs/api/reduxform.md/#optional) object are available to use.

## `Form.Field`

Each active element in a form is field. Fields can be of various types, textual, checkboxes and even action buttons.

Each `Field` will usually have a [`Form.Label`](#formlabel) component for the label, may have a help text via the [`Form.Help`](#formhelp) component and may have several [`Form.Option`](#formoption) components for field types that offer multiple selections (`type="select"` or `type="radio"`) or [`Form.Button`](#formbutton) for `type="buttonGroup"`

### `name`

The mandatory name for the field. It will be used to refer to this field internally throughout the application and in the Redux store. The [`validate`](#validate), [`onSubmit`](#onsubmit) will use this name as the property name for this value and the errors and warning must have this name to match it with the field.

### `type`

The `type` attribute must always be present and may be one of `buttonGroup`, `text`, `select`, `checkbox`, `radio`, `color`, `date`, `datetime-local`, `email`, `file`, `hidden`, `image`, `month`, `number`, `password`, `tel`, `time`, `url`, `week`.

Most of the types translate into simple `<input type="..." />` elements, which will be rendered according to the capabilities of the browser. Some deserve special consideration:

#### `type="buttonGroup"`

This may enclose [`Form.Button`](#formbutton) components. Of those buttons, the one of `type="submit"` will trigger the form submission while the one of `type="reset"` will return the form to its initial values.

#### `type="text"`

It will usually render as a regular `<input>` element but if the [`rows`](#rows) attribute is present it will produce a `<textarea>` for the given size.

#### `type="select"`

It will produce a dropdown `<select>` element. It must be followed by one or more [`Field.Option`](#fieldoption) components with the values and labels for the options within the dropdown

#### `type="radio"`

It will produce a collection of `<input type="radio" />` elements. It must be followed by one or more [`Field.Option`](#fieldoption) components with the values and labels for each of the radios. The whole set of radio buttons will have a common label, help and error message text.

#### `type="checkbox"`

It will render a `<input type="checkbox" />` element. The label will be aligned with the labels of the rest of the fields, however, a text may be added to the right of the checkbox via the [`placeholder`](#placeholder) attribute.

### `rows`

Only applicable to fields of `type="text"`, it will produce a `<textarea>` of the given size.

### `placeholder`

It will produce the `placeholder` attribute in the underlying input element, except for checkboxes where the text will be placed beside the box itself.

## `Form.Label`

The contents of this component will produce the label for this field. On wider screens, it will be displayed to the left of each field but it will be shown immediately on top of the field in smaller screens.

The [`Form.Field`](#formfield) component already assigns ids to the input elements and fills in the `htmlFor` pseudo-attribute for the underlying `<label>` element.

All other attributes are passed on verbatim.

## `Form.Help`

Adds a help text below the field, in smaller dimmer typeface.

## `Form.Option`

Provides options for fields of type `select` and `radio`. The contents of the component will provide the label for this option.

### `value`

The value that is the internal representation of this option. As with all HTML input elements the value will return a string so even if numerical values are given, the values returned will be strings. The [`parse`](#parse) and [`format`](#format) functions can be used to convert it. See the field of type `radio` in the example [at the top](#usage).

Checkboxes do produce boolean values.

### `format`

A function that receives:

* `value`: the raw value to be formatted
* `name`: the name of the field

It should return the value to be displayed to the user.

### `parse`

A function that receives

* `value`: the value as typed by the user
* `name`: the name of the field being parsed

It should return the value to be stored internally.
