import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseComponent from '../BaseComponent';
import ListItem from './ListItem';

type Props = {};

export type Task = {
  title: string;
  index: number;
};

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

const ListTasks: Array<Task> = TITLES.map((title, index) => ({title, index}));

const SwipeToDeleteAnimation = (props: Props) => {
  const [tasks, setTasks] = useState(ListTasks);

  const onDismiss = useCallback((task: Task) => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  return (
    <BaseComponent>
      <Text style={styles.title}>Task</Text>
      <ScrollView style={{flex: 1, paddingTop: 20}}>
        {tasks.map(task => (
          <ListItem
            key={task.index.toString()}
            data={task}
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
    </BaseComponent>
  );
};

export default SwipeToDeleteAnimation;

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    fontSize: 40,
    fontWeight: 'bold',
  },
});
