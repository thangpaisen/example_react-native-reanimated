import React from 'react';
import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Task} from './SwipeToDeleteAnimation';

type Props = {
  data: Task;
  onDismiss?: (task: Task) => void;
};

const {width, height} = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

const WIDTH_ITEM = width - 40;

const ListItem = ({data, onDismiss}: Props) => {
  const transformX = useSharedValue(0);
  const marginTop = useSharedValue(20);
  const itemHeight = useSharedValue(60);
  const scaleItem = useSharedValue(1);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event, context) => {
      transformX.value = event.translationX;
    },
    onEnd(event, context) {
      if (-transformX.value > WIDTH_ITEM / 3) {
        itemHeight.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(data);
          }
        });
        transformX.value = withTiming(-width);
        marginTop.value = withTiming(0);
        scaleItem.value = 0;
      } else {
        transformX.value = 0;
      }
    },
  });

  const rStyleItem = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: transformX.value,
      },
    ],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => ({
    marginTop: marginTop.value,
    height: itemHeight.value,
  }));

  const rStyleIconRemove = useAnimatedStyle(() => {
    const opacity = withTiming(transformX.value < -WIDTH_ITEM / 5 ? 1 : 0);
    return {
      opacity,
      transform: [
        {
          scale: scaleItem.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          marginHorizontal: 20,
          justifyContent: 'center',
        },
        rTaskContainerStyle,
      ]}
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.main, rStyleItem]}>
          <Text>{data.title}</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.viewIcon, rStyleIconRemove]}>
        <AnimatedImage
          source={require('../app/assets/images/bin.png')}
          style={[styles.icon]}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  main: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewIcon: {
    zIndex: -1,
    paddingHorizontal: 20,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    tintColor: 'red',
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
