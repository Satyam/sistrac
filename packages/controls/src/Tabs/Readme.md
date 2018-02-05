# Tabs and Tab components

## Loading

Any of the following will work:

```
import { Tabs, Tab } from '@devasatyam/controls/lib/Tabs';
import Tabs from '@devasatyam/controls/lib/Tabs';
import Tabs from '@devasatyam/controls';
```

The first will provide separate `Tabs` and `Tab` component, the last two will provide `Tabs` and `Tabs.Tab`.

## Usage

```
<Tabs activeTab="basic" tabGroup="estacionTab">
  <Tabs.Tab tabId="basic" label="Sumario" active>
    <Sumario estacion={estacion} />
  </Tabs.Tab>
  <Tabs.Tab tabId="trenes" label="Trenes">
    <TrenesPorEstacion idEstacion={idEstacion} />
  </Tabs.Tab>
  <Tabs.Tab tabId="eventos" label="Eventos">
    <EventosEstacion idEstacion={idEstacion} />
  </Tabs.Tab>
</Tabs>
```

The `Tabs` component encloses any number of `Tab` (or `Tabs.Tab`) components, each with its content.

### `Tabs` attributes

The `Tabs` component accepts the following attributes:

#### `activeTab`

Contains the identifier of the tab [`tabId`](#tabId) to be shown as active. If not present, the first tab will be active.

#### `tabGroup`

A string, preferrably URL-safe, which will be used to add a URL search parameter with the given name to the location. Thus, in this case, whatever the URL might be, a `?estacionTab=basic` URL search parameter will be added to the current location, thus making it easier to save or share the URL with the current view of the page. If `tabGroup` is omitted, no such URL search parameter will be added.

#### `className`

A class name which will be added to and may override those already preset.

#### `onTabClick`

A function that will be called when a tab is clicked and before it actually switches to that tab. It will receive the `tabId`s of the tab clicked and the one of the currently active. It can prevent the switch from happening by returning exactly `false`.

### `Tab` attributes

#### `tabId`

A string, unique within this tab group, to identify this tab. It is the one the [`activeTab`](#activeTab) attribute may refer to.

It will be used as the `key` attribute for the list item used to represent the tab and it is the one reported in the arguments to the [`onTabClick`](#onTabClick) function, if present and serves as argument to the URL search parameter given by the [`tabGroup`](#tabGroup) attribute.

#### `label`

The label to be shown to the user. It can either be a string or JSX `label={<div> any number of elements</div>}`

#### `className`

A class name which will be added to and may override those already preset.

#### `disabled`

If present, the tab will not respond to clicks and will show slightly dim.

#### `children`

The children of the `Tab` element will be shown when the tab is clicked. No restriction is placed on these.
