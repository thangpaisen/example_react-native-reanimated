import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ShowVideoEditorModalExample} from './ShowPhotoEditorModalExample';

type Props = {};

const He = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
          }}>
          <Text>He</Text>
        </TouchableOpacity>
        <ShowVideoEditorModalExample
          visible={visible}
          onFinish={() => {
            console.log('done');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default He;

const styles = StyleSheet.create({});
