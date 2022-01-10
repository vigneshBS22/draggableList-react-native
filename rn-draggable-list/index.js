import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DraggableItem from './DraggableItem';

const DraggableList = ({data, dragIcon, content, styles}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [flatListTopOffset, setFlatListTopOffset] = useState(0);
  const [items, setItems] = useState(data);
  return (
    <View style={listStyle.container}>
      <FlatList
        style={{width: '100%', height: '50%'}}
        data={items}
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
            setData={setItems}
            data={items}
            dragIcon={dragIcon}
            content={content}
            styles={styles}
          />
        )}
      />
    </View>
  );
};

export default DraggableList;

const listStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
