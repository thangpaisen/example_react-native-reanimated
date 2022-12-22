import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseComponent from '../BaseComponent';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';

type Props = {};

type Task = {
  id: number;
};
let ListTask: Array<Task> = new Array(5)
  .fill(0)
  .map((task, index) => ({id: index}));

const LayoutAnimations = (props: Props) => {
  const [items, setItems] = useState<Array<Task>>(ListTask);

  const onAdd = (): void => {
    setItems(prev => {
      return [...prev, {id: prev.length}];
    });
  };

  const onDelete = (id: number): void => {
    const newItems = items.filter(item => item.id != id);
    setItems(newItems);
  };

  return (
    <BaseComponent>
      <TouchableOpacity style={styles.buttonAdd} onPress={onAdd}>
        <Text
          style={{
            fontSize: 40,
            color: '#fff',
          }}
        >
          +
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
      >
        {items.map(item => {
          return (
            <Animated.View
              key={item.id.toString()}
              style={styles.listItem}
              onTouchEnd={() => {
                onDelete(item.id);
              }}
              exiting={FadeOut}
              layout={Layout.delay(100)}
              entering={FadeIn}
            >
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                }}
              >
                {item.id}
              </Text>
            </Animated.View>
          );
        })}
      </ScrollView>
    </BaseComponent>
  );
};

export default LayoutAnimations;

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'violet',
    height: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAdd: {
    zIndex: 9999,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
});
