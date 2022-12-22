import {FlatList, StyleSheet, Text, View, ViewToken} from 'react-native';
import React from 'react';
import BaseComponent from '../BaseComponent';
import ListItem from './ListItem';
import {useSharedValue} from 'react-native-reanimated';

type Props = {};

const data = new Array(50).fill(0).map((_, index) => ({
  id: index,
}));

const AnimatedFlatList = (props: Props) => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const renderItem = ({item}: any) => {
    return <ListItem data={item} viewableItems={viewableItems} />;
  };

  return (
    <BaseComponent>
      <FlatList
        data={data}
        contentContainerStyle={{
          paddingTop: 40,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
      />
    </BaseComponent>
  );
};

export default AnimatedFlatList;

const styles = StyleSheet.create({});
