import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  TapGestureHandler,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {};

const ImageAnimation = Animated.createAnimatedComponent(Image);

const DoubleTap = (props: Props) => {
  const scale = useSharedValue(1);
  const doubleTapRef = useRef<TapGestureHandler>();

  const styleView = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  const handleDoubleClick = useCallback(() => {
    scale.value = withSpring(1, undefined, final => {
      if (final) {
        scale.value = withDelay(200, withTiming(0));
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <TapGestureHandler
          waitFor={doubleTapRef}
          onActivated={() => {
            console.log('Single Tab');
          }}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={handleDoubleClick}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ImageBackground
                source={{
                  uri: 'https://i.redd.it/jeuusd992wd41.jpg',
                }}
                style={{
                  width: '100%',
                  height: 400,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImageAnimation
                  source={require('./like.png')}
                  style={[
                    {
                      width: 50,
                      resizeMode: 'contain',
                      tintColor: '#fff',
                    },
                    styleView,
                  ]}
                ></ImageAnimation>
              </ImageBackground>
            </View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </SafeAreaView>
  );
};

export default DoubleTap;

const styles = StyleSheet.create({});
