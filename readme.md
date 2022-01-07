```
import Draggable from 'rn-draggable-list';
import {Data} from './data';

const App = () => {
  return <Draggable data={Data} />;
};
```

data must be in {id:**,item:**} format. I'll add custom data format including custom list item in the future.
