import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList,
  Button
 } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoal] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoal(currentCourseGoals => 
      [...currentCourseGoals, 
        { text: enteredGoalText, id: Math.random().toString() }
      ]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    setCourseGoal(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <Button 
        title="Add New Goal" 
        color="#914aef"
        onPress={startAddGoalHandler} 
        />
      <GoalInput 
        visible={modalIsVisible} 
        onAddGoal={addGoalHandler} 
        onCancel={endAddGoalHandler} 
        /> 
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} 
        renderItem={(itemData) => {
          return (
            <GoalItem 
            text={itemData.item.text}
            id={itemData.item.id}
            onDeleteItem={deleteGoalHandler} />
          )
        }} 
        keyExtractor={(item, index) => {
          return item.id;
        }}
        alwaysBounceVertical={false}>
        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },
  goalsContainer: {
    flex: 5
  },
});
