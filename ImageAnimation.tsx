import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type Props = {};

const imageUrl = 'https://i.redd.it/jeuusd992wd41.jpg';

const {width, height} = Dimensions.get('window');

const ImageAnimation = (props: Props) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalX.value,
        },
        {
          translateY: focalY.value,
        },
        {
          translateX: -width / 2,
        },
        {
          translateY: -height / 2,
        },
        {
          scale: scale.value,
        },
        {
          translateX: -focalX.value,
        },
        {
          translateY: -focalY.value,
        },
        {
          translateX: width / 2,
        },
        {
          translateY: height / 2,
        },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalX.value,
        },
        {
          translateY: focalY.value,
        },
      ],
    };
  });
  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View
          style={{
            flex: 1,
          }}
        >
          <AnimatedImage
            source={{uri: imageUrl}}
            style={[
              {
                flex: 1,
              },
              rStyle,
            ]}
          />
          <Animated.View style={[styles.focalPoint, focalPointStyle]} />
        </Animated.View>
      </PinchGestureHandler>
    </SafeAreaView>
  );
};

export default ImageAnimation;

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});
