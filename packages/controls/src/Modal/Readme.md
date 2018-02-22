# Modal components

## Loading

Any of the following will work:

```
import {
  Modal,
  Header,
  Body,
  Footer,
  Alert,
  Confirm,
  Prompt,
  withAlert,
  withConfirm,
  withPrompt,
} from '@devasatyam/controls/lib/Modal';

import Modal from '@devasatyam/controls/lib/Modal';
import { Modal } from '@devasatyam/controls';
```

The first will provide the various components by its individual names, the last two will provide `Modal` and `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Alert`, `Modal.Confirm` and `Modal.Prompt` plus the High-order Components `Modal.withAlert`, `Modal.withConfirm` and `Modal.withPrompt`.

## Usage

```
<Modal open>
  <Modal.Header closeButton>
    <h4>Heading</h4>
  </Modal.Header>
  <Modal.Body>This is the body of the modal box</Modal.Body>
  <Modal.Footer>
    <Button color="primary">Ok</Button>
    <Button className="close-button">Close</Button>
  </Modal.Footer>
</Modal>

<Modal.Alert open title="Heading" buttonLabel="Accept">
  This is the body of the alert
</Modal.Alert>

<Modal.Confirm open title="Are you sure?" yesLabel="Yes" noLabel="No">
  Are you really, totally, absolutely sure?
</Modal.Confirm>
```

The most practical way to use these components is via their [HoC](#hoc) versions, which will be explained later

## `Modal`

Renders the frame for the modal dialog and the mask that prevents the user from accessing the contents underneath, simulating a true modal box, though not blocking the execution of the code.

It contains up to three sections [`Header`](#modalheader), [`Body`](#modalbody) and [`Footer`](#modalfooter) which are defined separately.

Its attributes are:

### `open`

A boolean that determines whether the modal box is displayed or not.

### `onClose`

A function that is called whenever the Modal box is closed. Since it will not spontaneously open on its own, there is no equivalent event for open.

The Modal box is set to close by clicking anywhere outside of the box and whenever anything with a className of `close-button` is clicked. The `close-button` className has no styles associated with it, it is just an identifier for elements that can be clicked to close the Modal box.

### `centered`

The modal box will be centered both vertically and horizontally within the page.

### `size`

Either `sm` or `lg` to alter the default size of the box.

### `children`

Usually, any, some or all of [`Modal.Header`](#modalheader), [`Modal.Body`](#modalbody) or [`Modal.Footer`](#modalfooter)

## `Modal.Header`

Renders the contents in the top band of the box optionally with a close icon on the upper right corner. Any attributes passed to this component will be passed on to the underlying `<div>`, except:

### `closeButton`

If present, this attribute draws the close button on the upper right corner of the header.

### `children`

Whatever needs to be displayed within this section. No special highlighting is provided, thus it might be useful to use `<h3>` or other highlighting means.

### `className`

Class names to be merged with those built in.

## `Modal.Body`

Renders the central part of the Modal box. Any attributes passed to this component will be passed on to the underlying `<div>`, except:

### `children`

Whatever is meant to be rendered within this area.

### `className`

Class names to be merged with those built in.

## `Modal.Footer`

Renders the bottom part of the Modal box, usually resered for action buttons. Any attributes passed to this component will be passed on to the underlying `<div>`, except:

### `children`

Whatever is meant to be rendered within this area.

### `className`

Class names to be merged with those built in.

## `Modal.Alert`

A helper to provide an simple and consistent way to show an equivalent of a `window.alert()` modal box.

The contents (children) of this component will be shown in the body section of the box. A single button will be shown to dismiss the alert.

### `title`

The text or JSX to be shown in the header section of the modal box.

### `buttonLabel`

The text to be shown in the only button shown in the footer section of the modal box.

### `buttonColor`

The color for the button, it defaults to `primary`. It should be one of the standard Bootstrap colors, namely: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`. The `link` color makes the button look like a link, but does not change its behavior.

### `open`

If present, the box will be shown.

### `onClose`

A function that will be called when the alert is dismissed. No arguments are provided to this function.

## `Modal.Confirm`

A helper to provide an simple and consistent way to show an equivalent of a `window.confirm()` modal box.

The contents (children) of this component will be shown in the body section of the box. Two buttons will be shown, one to accept the other to reject the issue.

### `title`

The text or JSX to be shown in the header section of the modal box.

### `yesLabel`

The text to be shown for the left, primary button shown in the footer section of the modal box. It defaults to `Ok`.

### `yesColor`

The color for the yes button, it defaults to `primary`. It should be one of the standard Bootstrap colors, namely: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`. The `link` color makes the button look like a link, but does not change its behavior.

### `noLabel`

The text to be shown for the right, secondary button shown in the footer section of the modal box. It defaults to `Cancel`.

### `noColor`

The color for the no button, it defaults to `secondary`. It should be one of the standard Bootstrap colors, namely: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`. The `link` color makes the button look like a link, but does not change its behavior.

### `open`

If present, the box will be shown.

### `onConfirm`

A function that will be called when an option is chosen. Its single argument will be `true` or `false` for each of the buttons, or `null` (which is falsy anyway) if the confirm box was simply dismissed by clicking outside of the box or the close icon at the top right.

## `Modal.Prompt`

A helper to provide an simple and consistent way to show an equivalent of a `window.prompt()` modal box.

The contents (children) of this component will be shown in the body section of the box, with a simple input box below. Two buttons will be shown, one to submit the value, the other to cancel the entry.

### `title`

The text or JSX to be shown in the header section of the modal box.

### `yesLabel`

The text to be shown for the left, primary button shown in the footer section of the modal box. It defaults to `Ok`.

### `yesColor`

The color for the yes button, it defaults to `primary`. It should be one of the standard Bootstrap colors, namely: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`. The `link` color makes the button look like a link, but does not change its behavior.

### `noLabel`

The text to be shown for the right, secondary button shown in the footer section of the modal box. It defaults to `Cancel`.

### `noColor`

The color for the no button, it defaults to `secondary`. It should be one of the standard Bootstrap colors, namely: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `link`. The `link` color makes the button look like a link, but does not change its behavior.

### `open`

If present, the box will be shown.

### `onConfirm`

A function that will be called when an option is chosen. Its single argument will be the value entered, if the `Ok` button is pressed or `null` if it is canceled by any means.

### `initialValue`

The initial value to be offere to the user. If not provided, the input box will be empty.

### `placeholder`

Used for the `placeholder` property of the input box.

## `Modal.withAlert`, `Modal.withConfirm` and `Modal.withPrompt` HoCs.

It would be great to use the `Alert`, `Confirm` and `Prompt` helpers in a way that mostly resembles the `window.alert`, `window.confirm` and `window.prompt` methods of the browser.

In their `window.xxx` versions, they are truly modal so they are synchronous functions that will not return (and thus block the application) until resolved. Since these modal boxes are asynchronous, we would expect then to return Promises.

These HoC function will provide a `showAlert`, `showConfirm` or `showPrompt` function as an argument to the component they wrap:

```
const Example = ({ showConfirm }) => (
  <div>
    {/*  -----  any content ----- */}
    <Button
      onClick={() =>
        showConfirm({
          title: 'Delete',
          body: `Are you sure you want to delete item ${id}?`,
          yesColor: 'danger',
        })
        .then(result => {
          if (result) {
            // proceed to delete the item
          }
        }
      }
    >
      Delete
    </Button>
  </div>
);

Example.propTypes = {
  showConfirm: PropTypes.func,
};

export default Modal.withPrompt(Example);
```

The component to show the modal box should be wrapped with the HoC version of the modal required. All of them can be used in the same component by composing them using any of the `compose` methods available in modules such as Recompose or Redux, that is why each of them have their `showXxxx` named differently.

Each of the `showXxxx` functions takes an object with the same properties as the attributes on the corresponding modal helper. They all return a Promise which will resolve to the value that would be expected from the original helper, that is:

* nothing from `showAlert` since the alert box can only be closed and offers no options.
* `true`, `false` or `null` from `showConfirm`.
* The entered value when the `Ok` button is pressed, or `null`.
