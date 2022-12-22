import React from 'react';
import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BaseComponent from '../BaseComponent';
import {BackgroundGradient} from './BackgroundGradient';

type Props = {};

const {width, height} = Dimensions.get('window');

const CARD_WIDTH = wp(80) - 10;
const CARD_HEIGHT = wp(60) - 10;

const Animated3DCard = (props: Props) => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const rStyleCard = useAnimatedStyle(() => {
    return {
      transform: [
        {
          perspective: 400,
        },
        {
          rotateX: `${rotateX.value}deg`,
        },
        {
          rotateY: `${rotateY.value}deg`,
        },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP)
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP)
      );
    })
    .onUpdate(event => {
      rotateX.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolate.CLAMP
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolate.CLAMP
      );
    })
    .onEnd(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  return (
    <BaseComponent
      style={{
        backgroundColor: '#444B6F',
      }}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BackgroundGradient width={CARD_WIDTH} height={CARD_HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, rStyleCard]}>
          <Image
            source={{
              uri: 'https://images6.alphacoders.com/740/thumb-1920-740310.jpg',
            }}
            style={{
              width: wp(16),
              height: wp(16),
              borderRadius: wp(16),
            }}
          />
          <Text
            style={{
              fontWeight: '600',
              color: '#ffffff',
              fontSize: 16,
              marginTop: 10,
            }}
          >
            ThangPaisen
          </Text>
        </Animated.View>
      </GestureDetector>
    </BaseComponent>
  );
};

export default Animated3DCard;

const styles = StyleSheet.create({
  viewMain: {
    width: wp(80),
    height: wp(60),
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: 'violet',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,

    elevation: 12,
  },
  card: {
    zIndex: 9999,
    width: CARD_WIDTH - 4,
    height: CARD_HEIGHT - 4,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#000',
    padding: 20,
  },
});
