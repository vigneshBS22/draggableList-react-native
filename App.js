/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Data} from './data';
import Draggable from 'rn-draggable-list';

const App = () => {
  return <Draggable data={Data} />;
};

export default App;
