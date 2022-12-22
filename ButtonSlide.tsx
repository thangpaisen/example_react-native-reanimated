import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
type Props = {};
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

const ButtonSlide = (props: Props) => {
  const [isHistory, setIsHistory] = useState<boolean>(true);
  const animatedButtonSwitch = useSharedValue(0);
  const opacityCircle = useSharedValue(1);
  const scaleCircle = useSharedValue(2);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleOnClick = (isHistory: boolean): void => {
    animatedButtonSwitch.value = isHistory ? 0 : (width - 40) / 2;
    setIsHistory(isHistory);
  };

  const styleBox = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animatedButtonSwitch.value),
        },
      ],
    };
  });

  const styleCircle = useAnimatedStyle(() => {
    return {
      opacity: opacityCircle.value,
      borderRadius: (opacityCircle.value * 100) / 2,
      transform: [
        {
          scale: scaleCircle.value,
        },
        {
          rotate: `${opacityCircle.value * 2 * Math.PI}rad`,
        },
      ],
    };
  });

  const styleHehe = useAnimatedStyle(() => {
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

  useEffect(() => {
    opacityCircle.value = withRepeat(withTiming(0.5), -1, true);
    scaleCircle.value = withRepeat(withTiming(1), -1, true);
  }, []);

  return (
    <View
      style={{
        marginTop: 100,
      }}>
      <View style={styles.switchView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleOnClick(true);
          }}>
          <Text style={[styles.text, isHistory && styles.textFocused]}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleOnClick(false);
          }}>
          <Text style={[styles.text, !isHistory && styles.textFocused]}>
            Supper
          </Text>
        </TouchableOpacity>
        <Animated.View style={[styles.buttonSwitch, styleBox]}>
          <Text style={[styles.text2]}>{isHistory ? 'History' : 'Supper'}</Text>
        </Animated.View>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          opacityCircle.value = 1;
          scaleCircle.value = 2;
        }}>
        <Animated.View style={[styles.circle, styleCircle]} />
      </TouchableOpacity>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.box, styleHehe]} />
      </PanGestureHandler>
    </View>
  );
};

export default ButtonSlide;

const styles = StyleSheet.create({
  circle: {
    marginTop: 200,
    marginLeft: 100,
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  box: {
    marginTop: 200,
    marginLeft: 100,
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  switchView: {
    height: 46,
    backgroundColor: 'violet',
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 46,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSwitch: {
    height: 46,
    width: '50%',
    borderRadius: 20,
    backgroundColor: '#5a8ac4',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  text2: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  textFocused: {
    color: 'black',
  },
});
