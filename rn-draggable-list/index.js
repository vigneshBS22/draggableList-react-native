import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DraggableItem from './DraggableItem';

const DraggableList = ({data}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [flatListTopOffset, setFlatListTopOffset] = useState(0);
  const [items, setItems] = useState(data);
  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
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
          />
        )}
      />
    </View>
  );
};

export default DraggableList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
