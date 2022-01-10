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
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const App = () => {
  return (
    <Draggable
      data={Data}
      dragIcon={<Icon name="star" size={30} style={{marginTop: 20}} />}
    />
  );
};

export default App;
