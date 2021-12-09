import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Animated, PanResponder} from 'react-native';
const DraggableItem = ({
  item,
  scrollOffset,
  flatListTopOffset,
  data,
  setData,
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
      Animated.spring(
        pan,
        {
          toValue: {x: 0, y: 0},
        },
        {
          useNativeDriver: false,
        },
      ).start();

      newidx = Math.floor(
        (scrollOffset + currentY - flatListTopOffset) / rowHeight,
      );
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
      }}
      {...panResponder.panHandlers}>
      <Text style={styles.item}>{item}</Text>
    </Animated.View>
  );
};

export default DraggableItem;

const styles = StyleSheet.create({
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
});
