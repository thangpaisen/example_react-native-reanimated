import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Dice from './Dice';
type Props = {};

const WIDTH: number = Dimensions.get('window').width;
const HEIGHT: number = Dimensions.get('window').height;

const die1 = require('./app/assets/images/gameDie1.png');
const die3 = require('./app/assets/images/gameDie3.png');
const die6 = require('./app/assets/images/gameDie6.png');

const Bpp = (props: Props) => {
  const offset = useSharedValue({
    x: 0,
    y: 0,
  });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(offset.value.x * (WIDTH - 100)),
      marginTop: withTiming(offset.value.y * (HEIGHT - 100)),
    };
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: any) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      let X = event.translationX + context.translateX;
      let Y = event.translationY + context.translateY;

      translateX.value = X;
      translateY.value = Y;
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {/* <Pressable
          onPress={() => {
            offset.value = {
              x: Math.random(),
              y: Math.random(),
            };
            console.log('Math.random(): ', Math.random(), WIDTH);
          }}>
          <Animated.View style={[styles.box, defaultSpringStyles]} />
        </Pressable> */}

        <View style={[styles.main]}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.box, rStyle]} />
          </PanGestureHandler>
          {/* <View
            style={{
              zIndex: -1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Dice source={die6} />
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Dice source={die3} />
              <Dice source={die1} />
            </View>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Bpp;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    // backgroundColor: 'blue',
    height: 200,
    borderRadius: 10,
  },
});
