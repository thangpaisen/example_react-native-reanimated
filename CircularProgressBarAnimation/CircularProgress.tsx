import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {Circle, Svg} from 'react-native-svg';
import BaseComponent from '../BaseComponent';

type Props = {};

const {width, height} = Dimensions.get('window');
const CIRCLE_LENGTH = 1000;
const BACKGROUND_COLOR = '#444B6F';
const STROKE_COLOR = '#A6E1FA';
const BACKGROUND_STROKE_COLOR = '#303858';
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = (props: Props) => {
  const percent = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - percent.value),
  }));

  const onPress = () => {
    percent.value = withTiming(percent.value == 1 ? 0 : 1, {
      duration: 5000,
    });
  };

  const progressText = useDerivedValue(() => {
    return `${Math.floor(percent.value * 100)}`;
  });

  return (
    <BaseComponent
      style={{
        backgroundColor: BACKGROUND_COLOR,
      }}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{position: 'absolute'}}>
        <Circle
          cx={width / 2}
          cy={(height - 88) / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={(height - 88) / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={20}
          strokeDasharray={CIRCLE_LENGTH}
          strokeLinecap={'round'}
          animatedProps={animatedProps}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </BaseComponent>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256,256,256,0.7)',
  },
});
