import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList,Alert } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    Alert.alert(
      'Alert Title',
      'Are You Sure want to Delete',
      [
      
        {
          text: 'NO',
          style: 'cancel'
        },
        { text: 'Yes', onPress: ()=>{
          setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== goalId);
          });
        },
          
         }
      ],
      { cancelable: false }
    );
   
  }
  

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }
  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      {/* <ScrollView>
    {courseGoals.map((goal)=>(
      <View key={goal} style={styles.listItem}>
      <Text>{goal}</Text>
      </View>
      ))} 
      </ScrollView> */}

      {/* using FlatList property */}

      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },

});
