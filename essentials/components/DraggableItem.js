import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Animated, PanResponder} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const DraggableItem = ({
  item,
  index,
  scrollOffset,
  flatListTopOffset,
  data,
  setData,
  dragIcon = <Icon name="drag" size={30} style={{marginTop: 20}} />,
  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      fontSize: 24,
      fontWeight: '600',
      padding: 20,
      textAlign: 'center',
    },
    highlight: {
      fontWeight: '700',
    },
  }),
}) => {
  const [rowHeight, setRowHeight] = useState(0);
  let currentidx = 0;
  let newidx = 0;
  let currentY = 0;

  function immutableMove(arr, from, to) {
    // to rearrange array after move
    setData(
      arr.reduce((prev, current, idx, self) => {
        if (from === to) {
          prev.push(current);
        }
        if (idx === from) {
          return prev;
        }
        if (from < to) {
          prev.push(current);
        }
        if (idx === to) {
          prev.push(self[from]);
        }
        if (from > to) {
          prev.push(current);
        }
        return prev;
      }, []),
    );
  }

  const calculateNewIdx = () => {
    const value = Math.floor(
      (scrollOffset + currentY - flatListTopOffset) / rowHeight,
    );
    if (value >= data.length) value = data.length - 1;
    else if (value < 0) value = 0;
    return value;
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      currentidx = Math.floor(
        (scrollOffset + gestureState.y0 - flatListTopOffset) / rowHeight,
      );
      currentY = gestureState.y0;
    },
    onPanResponderMove: (e, gestureState) => {
      Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      })(e, gestureState);
      currentY = gestureState.moveY;
    },
    onPanResponderRelease: (e, gestureState) => {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();

      newidx = calculateNewIdx();
      if (newidx !== currentidx) {
        immutableMove(data, currentidx, newidx);
      }
      currentidx = newidx;
    },
  });

  return (
    <Animated.View
      onLayout={e => {
        setRowHeight(e.nativeEvent.layout.height);
      }}
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        padding: 4,
      }}>
      <View>
        <Text style={styles.item}>
          {index}. {item}
        </Text>
      </View>
      <View {...panResponder.panHandlers}>{dragIcon}</View>
    </Animated.View>
  );
};

export default DraggableItem;
