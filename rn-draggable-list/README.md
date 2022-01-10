# rn-draggable-list

## Installation

```sh
yarn add rn-draggable-list
```

## Usage

### Props

| Prop           | Type               | Description                          | Required | Default                               |
| -------------- | ------------------ | ------------------------------------ | -------- | ------------------------------------- |
| **`data`**     | `Array of objects` | Provide data to the list             | `Yes`    | `[{id:1,content:'Walk outside},...]'` |
| **`dragIcon`** | `Component`        | Set Icon for drag                    | `No`     | A drag icon component                 |
| **`content`**  | `Component`        | Set component for list content       | `No`     | A content component                   |
| **`styles`**   | `Stylesheet`       | Set stylesheet for content component | `No`     | A stylesheet                          |

### Example

```
import Draggable from 'rn-draggable-list';
import {Data} from './data';

const App = () => {
  return <Draggable data={Data} />;
};
```
