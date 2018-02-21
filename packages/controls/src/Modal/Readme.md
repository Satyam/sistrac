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
