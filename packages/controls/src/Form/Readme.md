# Form components

## Loading

Any of the following will work:

```
import { Form } from 'react-final-form';
import Field from '@devasatyam/controls/lib/Form';

import { Form, Field } from '@devasatyam/controls/lib/Form';
import { Form, Field } from '@devasatyam/controls';
```

The `<Form>` component from`react-final-form` is re-exported from the module for convenience, thus, they can be loaded separate or all at once from the same source file.

## Usage

```
<Form
  initialValues={{
    texto: 'textoInicial',
    checkbox: true,
    grupo: 1,
    select: 3,
  }}
  validate={validate}
  onSubmit={onSubmit}
  suscription={{ invalid: true, pristine: true, submitting: true }}
  render={({
    handleSubmit,
    reset,
    submitting,
    pristine,
    invalid,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          type="text"
          name="texto"
          label="Etiqueta texto"
          help="ayuda texto"
        />
        <Field
          type="checkbox"
          name="checkbox"
          placeholder="alguito"
          label="Etiqueta checkbox"
          help="ayuda checkbox"
        />
        <Field
          type="radio"
          name="grupo"
          format={formatNumber}
          parse={parseNumber}
          label="Options grupo:"
          help="ayuda grupo"
        >
          <option value={1}>uno</option>
          <option value={2}>dos</option>
          <option value={3}>tres </option>
        </Field>
        <Field
          type="select"
          name="select"
          format={formatNumber}
          parse={parseNumber}
          label="Options select:"
          help="ayuda select"
        >
          <option value={1}>uno</option>
          <option value={2}>dos</option>
          <option value={3}>tres </option>
        </Field>
        <Field type="buttonGroup" name="buttonGroup">
          <Button
            type="submit"
            color="primary"
            disabled={submitting || invalid || pristine}
          >
            Ok
          </Button>
          <Button type="reset" onClick={reset} disabled={pristine}>
            Reset
          </Button>
        </Field>
      </form>
    );
  }}
/>
```

A [`Form`](#form) encloses any number of [`Field`](#field) components of various types.

## `Form`

See [`react-final-form`](https://github.com/final-form/react-final-form)

Most often, the following attributes will be passed to it:

### `onSubmit`

A function that will be called when the validated form is submitted. It receives an object with the values keyed by their field names.

See: [`onSubmit`](https://github.com/final-form/final-form#onsubmit-values-object-form-formapi-callback-errors-object--void--object--promiseobject--void)

### `initialValues`

An object with the initial values of the fields, keyed by their field names.

See: [`initialValues`](https://github.com/final-form/final-form#initialvalues-object)

### `validate`

A function that will receive an object with the values and should return an object with a text indicating the error message, keyed by the field name, or an empty object if there are no errors.

```
const validate = values => {
  const errors = {};
  if (values.texto.length < 3) {
    errors.texto = 'too short';
  }
  if (values.checkbox) {
    errors.checkbox = 'should be unchecked';
  }
  if (values.grupo === 2) {
    errors.grupo = 'can\'t be 2';
  }
  if (values.select === 2) {
    errors.select = 'can\'t be 2';
  }
  return errors;
};
```

See ['validate'](https://github.com/final-form/final-form#validate-values-object--object--promiseobject)

### `render`

It should contain a function that will return the JSX to be rendered. That function will receive a good number of arguments, which is the whole point of it. See [`FormRenderProps`](https://github.com/final-form/react-final-form#formrenderprops)

The most relevant is:

#### `handleSubmit`

Contains a function that should be passed on to the `onSubmit` attribute of the form.

```
render={({
  handleSubmit,
}) => (
    <form onSubmit={handleSubmit}>
```

## `Field`

Each active element in a form is a field. Fields can be of various types, textual, checkboxes and even action buttons.

Most field types have no children, except:

* `type="select"` or `type="radio"` which need to have their options listed as children via `<option>` elements.
* `type="buttonGroup"` which should contain buttons or links.

### `name`

The mandatory name for the field. It will be used to refer to this field internally in the form. The [`validate`](#validate), [`onSubmit`](#onsubmit) will use this name as the property name for this value and the errors and warning must have this name to match it with the field.

### `type`

The `type` attribute must always be present and may be one of `buttonGroup`, `text`, `select`, `checkbox`, `radio`, `color`, `date`, `datetime-local`, `email`, `file`, `hidden`, `image`, `month`, `number`, `password`, `tel`, `time`, `url`, `week`.

Most of the types translate into simple `<input type="..." />` elements, which will be rendered according to the capabilities of the browser. Some deserve special consideration:

#### `type="buttonGroup"`

This may enclose [`Button`](../Button/Readme.md#button-component) components. Of those buttons, the one of `type="submit"` will trigger the form submission.

If a button of `type="reset"` is required, it can call the [`reset`](https://github.com/final-form/react-final-form#reset---void) which is provided to the function in the [`render`](#render) attribute.

#### `type="text"`

It will usually render as a regular `<input>` element but if the [`rows`](#rows) attribute is present it will produce a `<textarea>` for the given size.

#### `type="select"`

It will produce a dropdown `<select>` element. It must be followed by one or more `<option>` elements with the values and labels for the options within the dropdown

#### `type="radio"`

It will produce a collection of `<input type="radio" />` elements. It must be followed by one or more `<option>` elements with the values and labels for each of the radios. The whole set of radio buttons will have a common label, help and error message text.

#### `type="checkbox"`

It will render a `<input type="checkbox" />` element. The label will be aligned with the labels of the rest of the fields, however, a text may be added to the right of the checkbox via the [`placeholder`](#placeholder) attribute.

### `rows`

Only applicable to fields of `type="text"`, it will produce a `<textarea>` of the given size.

### `placeholder`

It will produce the `placeholder` attribute in the underlying input element, except for checkboxes where the text will be placed beside the box itself.

### `label`

The text to be displayed for this field. On wider screens, it will be displayed to the left of each field but it will be shown immediately on top of the field in smaller screens.

If there is a `label` set and no `id` on the field, the [`Field`](#field) component will generate ids for the input elements and will fill in the `htmlFor` pseudo-attribute for the underlying `<label>` element.

### `help`

Adds a help text below the field, in smaller dimmer typeface.

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
