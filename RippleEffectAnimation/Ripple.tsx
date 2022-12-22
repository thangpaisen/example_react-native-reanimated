import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type Props = {
  style?: StyleProp<ViewStyle>;
  onTab?: () => void;
  children: any;
};

const Ripple = ({style, onTab, children}: Props) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const aRef = useAnimatedRef<View>();
  const scale = useSharedValue(0);

  const tabGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart(tapEvent, context) {
        const layout = measure(aRef);
        width.value = layout.width;
        height.value = layout.height;

        centerX.value = tapEvent.x;
        centerY.value = tapEvent.y;

        scale.value = 0;
        scale.value = withTiming(1, {duration: 1000});
      },
      onActive(event, context) {
        console.log('event: ', event);
      },
      onEnd(event, context) {},
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      position: 'absolute',

      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: 'red',
      opacity: 0.2,
      transform: [
        {
          translateX,
        },
        {
          translateY,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <View style={style} ref={aRef}>
      <TapGestureHandler onGestureEvent={tabGestureEvent}>
        <Animated.View style={[style, {overflow: 'hidden'}]}>
          <View>{children}</View>
          <Animated.View style={[rStyle]} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({});
