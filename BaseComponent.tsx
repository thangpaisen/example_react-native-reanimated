import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewComponent,
  ViewStyle,
} from 'react-native';
import React, {ReactElement} from 'react';

type Props = {
  children: any;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
};

const BaseComponent = ({style, containerStyle, children}: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        ...style,
      }}
    >
      <View
        style={{
          flex: 1,
          ...containerStyle,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default BaseComponent;

const styles = StyleSheet.create({});
