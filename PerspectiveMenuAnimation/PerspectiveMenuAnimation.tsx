import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import BaseComponent from '../BaseComponent';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const {width: WIDTH_SCREEN, height} = Dimensions.get('window');
const THRESHOLD = WIDTH_SCREEN / 3;

const PerspectiveMenuAnimation = () => {
  const translateX = useSharedValue(0);

  const rStyleMenu = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, WIDTH_SCREEN / 2],
      [0, 3],
      Extrapolation.CLAMP
    );

    return {
      borderRadius: 10,
      transform: [
        {
          perspective: 100,
        },
        {
          translateX: translateX.value,
        },
        {
          rotateY: `-${rotate}deg`,
        },
      ],
    };
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart(event, context) {
      context.x = translateX.value;
    },
    onActive(event, context) {
      if (event.translationX + context.x > 0) {
        translateX.value = event.translationX + context.x;
      }
    },
    onEnd(event, context) {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(WIDTH_SCREEN / 2);
      }
    },
  });

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(WIDTH_SCREEN / 2);
    }
  }, []);

  return (
    <BaseComponent
      style={{
        backgroundColor: 'violet',
      }}
    >
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.menu, rStyleMenu]}>
          <Pressable
            onPress={onPress}
            style={{
              alignSelf: 'flex-start',
            }}
          >
            <Image
              source={require('../app/assets/images/menu.png')}
              style={styles.icon}
            />
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </BaseComponent>
  );
};

export default PerspectiveMenuAnimation;

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    margin: 12,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
