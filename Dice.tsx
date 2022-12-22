import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  source: any;
};

const Dice = ({source}: Props) => {
  return (
    <View
      style={{
        margin: 2,
      }}>
      <Image
        source={source}
        style={{
          width: 40,
          height: 40,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default Dice;

const styles = StyleSheet.create({});
