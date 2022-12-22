import {StyleSheet, Text, View, ViewToken} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTiming, useSpring} from 'react-native-redash';

type Props = {
  data: any;
  viewableItems: Animated.SharedValue<ViewToken[]>;
};

const ListItem = ({data, viewableItems}: Props) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item.id == data.id)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0.3),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  });

  return <Animated.View style={[styles.item, rStyle]} />;
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    height: 80,
    backgroundColor: 'violet',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
