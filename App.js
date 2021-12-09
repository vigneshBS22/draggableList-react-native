/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DraggableItem from './components/DraggableItem';

const App = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [flatListTopOffset, setFlatListTopOffset] = useState(0);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={data}
        onScroll={e => {
          setScrollOffset(e.nativeEvent.contentOffset.y);
        }}
        onLayout={e => {
          setFlatListTopOffset(e.nativeEvent.layout.y);
        }}
        extraData={data}
        renderItem={({item}) => (
          <DraggableItem
            item={item}
            scrollOffset={scrollOffset}
            flatListTopOffset={flatListTopOffset}
            setData={setData}
            data={data}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
