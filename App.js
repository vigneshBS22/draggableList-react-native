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
  const [data, setData] = useState([
    {id: 1, content: 'go outside'},
    {id: 2, content: 'burger'},
    {id: 3, content: 'salad'},
    {id: 4, content: 'roam'},
    {id: 5, content: 'play'},
    {id: 6, content: 'go outside'},
    {id: 7, content: 'burger'},
    {id: 8, content: 'salad'},
    {id: 9, content: 'roam'},
    {id: 10, content: 'play'},
    {id: 11, content: 'burger'},
    {id: 12, content: 'salad'},
    {id: 13, content: 'roam'},
    {id: 14, content: 'play'},
  ]);
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
        renderItem={({item}) => (
          <DraggableItem
            item={item.content}
            index={item.id}
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
