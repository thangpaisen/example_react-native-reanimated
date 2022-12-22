import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

type Props = {
  COLORS: Array<string>;
};

const {width, height} = Dimensions.get('window');

const HEIGHT_BUTTON = 32;
const WIDTH_BUTTON = width - 80;

const ColorPicker = ({COLORS}: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const sInternalPicker = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: any) => {
      context.translateX = translateX.value;
      translateY.value = withTiming(-HEIGHT_BUTTON - 10);
      scale.value = withTiming(1.5);
    },
    onActive: (event, context) => {
      let X = event.translationX + context.translateX;
      if (X < 0) {
        translateX.value = 0;
      } else {
        translateX.value =
          X > WIDTH_BUTTON - HEIGHT_BUTTON ? WIDTH_BUTTON - HEIGHT_BUTTON : X;
      }
    },
    onEnd: () => {
      translateY.value = withTiming(0);
      scale.value = withTiming(1);
    },
  });

  return (
    <View style={styles.main}>
      <View
        style={{
          marginHorizontal: 40,
        }}
      >
        <LinearGradient
          colors={COLORS}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.linearGradient}
        ></LinearGradient>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[styles.internalPicker, sInternalPicker]}
          ></Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  linearGradient: {
    height: HEIGHT_BUTTON,
    borderRadius: 10,
  },
  internalPicker: {
    position: 'absolute',
    left: 0,
    width: HEIGHT_BUTTON,
    height: HEIGHT_BUTTON,
    borderRadius: HEIGHT_BUTTON / 2,
    backgroundColor: 'white',
  },
});
