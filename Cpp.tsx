import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimationType,
  Image,
  Dimensions,
  ViewStyle,
} from 'react-native';
import React, {
  useRef,
  useEffect,
  AnimationEvent,
  Children,
  ReactElement,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type Props = {
  children?: ReactElement;
  style?: ViewStyle;
};

const Center = ({children, style}: Props) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        ...style,
      }}>
      {children}
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const Cpp = (props: Props) => {
  const animatedView = useSharedValue({
    x: 0,
    y: 0,
  });
  const animatedView2 = useSharedValue({
    x: 0,
    y: 0,
  });

  const widthSafeArea = useRef(81);
  const HEIGHT = useRef(height - 81);

  console.log('widthSafeArea: ', widthSafeArea);

  useEffect(() => {
    var location = (width - 20) / 2;
    var location = width;

    var locationBox = {
      x: (width - 20) / 2,
      y: (HEIGHT.current - 20) / 2,
    };

    var locationBox = {
      x: 123,
      y: 234,
    };

    animatedView.value = {
      x: location,
      y: (location * locationBox.y) / locationBox.x,
    };
    animatedView2.value = {
      x: location,
      y: ((width - 20 - location) * locationBox.y) / locationBox.x,
    };
  }, []);

  const styleBox = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(animatedView.value.x, {
        duration: 3000,
        easing: Easing.ease,
      }),
      marginTop: withTiming(animatedView.value.y, {
        duration: 3000,
        easing: Easing.ease,
      }),
    };
  });

  const styleBox1 = useAnimatedStyle(() => {
    return {
      marginRight: withTiming(animatedView2.value.x, {
        duration: 3000,
        easing: Easing.ease,
      }),
      marginTop: withTiming(animatedView2.value.y, {
        duration: 3000,
        easing: Easing.ease,
      }),
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {/* <Animated.Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={{
          marginLeft: 100,
          marginTop: 100,
          width: 100,
          height: 100,
          borderRadius: 100,
          ...discAnimation,
        }}
      /> */}
      <View
        style={{
          flex: 1,
        }}>
        <Center
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              {
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'green',
              },
            ]}
          />
        </Center>
        <Center
          style={{
            marginLeft: 123,
            marginTop: 234,
          }}>
          <View
            style={[
              {
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'black',
              },
            ]}
          />
        </Center>
        <Center style={{}}>
          <Animated.View
            style={[
              {
                alignSelf: 'flex-start',
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'blue',
              },
              styleBox,
            ]}></Animated.View>
        </Center>
        <Center>
          <Animated.View
            style={[
              {
                alignSelf: 'flex-end',
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'red',
              },
              styleBox1,
            ]}></Animated.View>
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default Cpp;

const styles = StyleSheet.create({});
