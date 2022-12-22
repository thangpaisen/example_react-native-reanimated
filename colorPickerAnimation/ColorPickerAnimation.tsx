import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BaseComponent from '../BaseComponent';
import ColorPicker from './ColorPicker';

type Props = {};

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const ColorPickerAnimation = (props: Props) => {
  return (
    <BaseComponent>
      <View style={styles.container}>
        <View style={styles.main}></View>
        <View style={styles.footer}>
          <ColorPicker COLORS={COLORS} />
        </View>
      </View>
    </BaseComponent>
  );
};

export default ColorPickerAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 3,
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    backgroundColor: '#000',
  },
});
