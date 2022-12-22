import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimationType,
  Image,
  Easing,
} from 'react-native';
import React, {useRef, useEffect, AnimationEvent} from 'react';
import Cpp from './Cpp';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ButtonSlide from './ButtonSlide';
import {toastConfig} from './toastConfig';
import ThemeAnimation from './ThemeAnimation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ImageAnimation from './ImageAnimation';
import DoubleTap from './DoubleTap';
import ColorPickerAnimation from './colorPickerAnimation/ColorPickerAnimation';
import CircularProgress from './CircularProgressBarAnimation/CircularProgress';
import SwipeToDeleteAnimation from './SwipeToDeleteAnimation/SwipeToDeleteAnimation';
import RippleEffectAnimation from './RippleEffectAnimation/RippleEffectAnimation';
import PerspectiveMenuAnimation from './PerspectiveMenuAnimation/PerspectiveMenuAnimation';
import LayoutAnimations from './LayoutAnimations/LayoutAnimations';
import AnimatedFlatList from './AnimatedFlatList/AnimatedFlatList';
import Animated3DCard from './Animated3DCard/Animated3DCard';

type Props = {};

const App = (props: Props) => {
  const animatedView = useRef(
    new Animated.ValueXY({
      x: 50,
      y: 100,
    })
  ).current;
  const animatedHeight = useRef(new Animated.Value(1)).current;
  const discAnimLoopRef = useRef<any>();
  const discAnimLoopRef1 = useRef<any>();
  const discAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    discAnimLoopRef.current = Animated.loop(
      Animated.timing(animatedView, {
        toValue: {
          x: 200,
          y: 400,
        },
        duration: 2000,
        useNativeDriver: false,
      })
    );

    // discAnimLoopRef.current.start();

    discAnimLoopRef1.current = Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    discAnimLoopRef1.current.start();
  }, []);

  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <ButtonSlide /> */}
        {/* <ThemeAnimation /> */}
        {/* <ImageAnimation /> */}
        {/* <DoubleTap /> */}
        {/* <ColorPickerAnimation /> */}
        {/* <CircularProgress /> */}
        {/* <SwipeToDeleteAnimation /> */}
        {/* <RippleEffectAnimation /> */}
        {/* <PerspectiveMenuAnimation /> */}
        {/* <LayoutAnimations /> */}
        {/* <AnimatedFlatList /> */}
        <Animated3DCard />
        {/* <Toast config={toastConfig} /> */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Animated.Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={{
          marginLeft: 100,
          marginTop: 100,
          width: 100,
          height: 100,
          borderRadius: 100,
          ...discAnimation,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          discAnimLoopRef.current.stop();
        }}
      >
        <Animated.View
          style={{
            width: 100,
            height: 100,
            marginLeft: animatedView.x,
            marginTop: animatedView.y,
            backgroundColor: 'red',
          }}
        ></Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
