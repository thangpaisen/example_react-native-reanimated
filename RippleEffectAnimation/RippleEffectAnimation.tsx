import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BaseComponent from '../BaseComponent';
import Ripple from './Ripple';

type Props = {};

const RippleEffectAnimation = (props: Props) => {
  return (
    <BaseComponent
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Ripple style={styles.button}>
        <Text style={styles.textButton}>Tab</Text>
      </Ripple>
    </BaseComponent>
  );
};

export default RippleEffectAnimation;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textButton: {},
});
