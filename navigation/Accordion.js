import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CrossedCheckbox from "../components/CrossedCheckbox";
import { ProgressBar } from "react-native-paper";
import CheckboxListInput from "../components/CheckboxListInput";
import SetPriority from "../components/SetPriority";

const Accordion = (props) => {
  const item = props.item;
  const id = item.id;
  const taskTitle = item.task;
  const taskDescription = item.description;
  const taskCategory = item.categori;
  // const firstProgress = item.progress;
  const firstList = Object.freeze(item.list);
  // const firstList = Object.freeze(props.firstList);
  // const [taskProgress, setTaskProgress] = useState(props.checkedProgress);
  const date = item.date;
  // console.log(`***********`, item.checked);
  // const taskChecked = item.checked[0];
  const taskChecked = props.checked;
  // console.log(`props.c`, props.c);
  const [taskProgress, setTaskProgress] = useState(taskChecked.progress || 0);
  // const [taskProgress, setTaskProgress] = useState(taskChecked.progress);
  const [taskList, setTaskList] = useState(taskChecked.list);
  // const [isChecked, setIsChecked] = useState(props.check);
  const [isChecked, setIsChecked] = useState(item.value);
  // const [taskList, setTaskList] = useState(props.checkedList);
  // const listTask = props.checkList;
  // const [checkedArray, setCheckedArray] = useState(item.checked[0]);
  const [checkedArray, setCheckedArray] = useState(taskChecked);
  const [taskTime, setTaskTime] = useState(item.time);
  const storageName = props.storageName;
  const navigation = props.navigation;
  const [expanded, setExpanded] = useState(false);
  const reminder = item.reminder;
  const repetition = item.repetition;
  const [priority, setPriority] = useState(item.priority);
  const currentDate = props.currentDate;
  const [disable, setDisable] = useState(false);
  // console.log(`TaskList!!!!!OOOOOOO:`, taskList);

  const [newObject, setNewObject] = useState({
    value: isChecked,
    date: currentDate,
    list: taskList,
    expanded: expanded,
    progress: taskProgress,
  });

  const previousTaskCheckedRef = useRef(taskChecked);

  useEffect(() => {
    const previousTaskChecked = previousTaskCheckedRef.current;

    if (previousTaskChecked !== taskChecked) {
      // Valoarea lui taskChecked s-a schimbat
      setIsChecked(taskChecked.value);
      setTaskList(taskChecked.list);
      setTaskProgress(taskChecked.progress || 0);
      setExpanded(false);
      setNewObject({
        value: isChecked,
        date: currentDate,
        list: taskList,
        expanded: false,
        progress: taskProgress,
      });
      // console.log("taskChecked s-a schimbat:", taskChecked);
      // Aici poți face orice acțiune necesară în urma schimbării valorii lui taskChecked

      // Actualizează referința către valoarea anterioară a lui taskChecked
      previousTaskCheckedRef.current = taskChecked;
    }
  }, [taskChecked]);

  const compareDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Adăugăm +1 la lună deoarece indexul lunilor începe de la 0
    const day = String(d.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    updateChecked();
    const edit = {
      id: id,
      category: taskCategory,
      title: taskTitle,
      notes: taskDescription,
      list: firstList,
      progress: taskProgress,
      date: date,
      time: taskTime,
      reminder: reminder,
      repetition: repetition,
      priority: priority,
      checked: checkedArray,
      ischecked: isChecked,
      screen: "Tasks",
    };
    const jsonString = JSON.stringify(edit);
    navigation.navigate("Add", {
      jsonString: jsonString,
      item: item,
    });
  };

  const handleDeleteBtn = async () => {
    await props.remove(id);
    navigation.reset({
      routes: [{ name: "Tasks" }],
    });
  };

  const updateChecked = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem(storageName);
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      const existingTaskIndex = tasks.findIndex(
        (item) =>
          item.id === id &&
          compareDate(item.date) === compareDate(date) &&
          item.task === taskTitle
      );
      const checkedTask = tasks[existingTaskIndex].checked;
      const existingChecked = checkedTask.findIndex((itemN) => {
        return compareDate(itemN.date) === compareDate(currentDate);
      });

      if (existingChecked !== -1) {
        checkedTask[existingChecked] = newObject;
        setCheckedArray(checkedTask);
      } else {
        checkedTask.push(newObject);
        setCheckedArray(checkedTask);
      }
      if (existingTaskIndex !== -1) {
        tasks[existingTaskIndex] = {
          ...item,
          checked: checkedTask,
          priority: priority,
        };
        await AsyncStorage.setItem(storageName, JSON.stringify(tasks));
      } else {
        tasks.push({ ...item, checked: checkedTask, priority: priority });
        await AsyncStorage.setItem(storageName, JSON.stringify(tasks));
      }
    } catch (error) {
      console.log("Error saveing in storage: ", error);
    }
  };
  // console.log(`tasksList:`, taskList);
  const handleCheckBox = (value) => {
    setIsChecked(value);
    if (value) {
      setTaskProgress(1);
      if (taskList.length !== 0) {
        // setTaskList(firstList);
        const completedList = taskList.map((l) => {
          return { ...l, checked: true };
        });
        // console.log(`completedList`, completedList);
        setTaskList(completedList);
      }
    } else {
      // setExpanded(false);
      setTaskProgress(0);
      // if ()
      if (taskList.length !== 0) {
        const completedList = taskList.map((l) => {
          return { ...l, checked: false };
        });
        // console.log(`completedList`, completedList);
        setTaskList(completedList);
      }
    }
  };

  const handleTaskList = (listO) => {
    setTaskList(listO);
  };

  const handleProgressTask = (value) => {
    setTaskProgress(value);
    if (value === 1) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleSetPriority = (value) => {
    setPriority(value);
  };
  // USEEFFECTS---------------------------

  useEffect(() => {
    if (taskProgress === 1) {
      setIsChecked(true);
      setExpanded(false);
    } else {
      setIsChecked(isChecked);
    }
  }, [taskProgress]);

  useEffect(() => {
    setNewObject({
      value: isChecked,
      date: currentDate,
      list: taskList,
      expanded: false,
      progress: taskProgress,
    });
  }, [isChecked, taskList, taskProgress]);

  useEffect(() => {
    updateChecked();
  }, [newObject, priority]);

  // -===================================
  const colors = ["#ABC1F8", "#B3F9B3", "#FFA9A3"];
  const colorsProgress = ["#008DFF", "#19D619", "#FF1D0B"];

  const [see, setSee] = useState(false);
  useEffect(() => {
    setSee(props.seeTasks);
  }, [props.seeTasks]);

  return (
    <View style={[styles.container, { backgroundColor: colors[priority] }]}>
      {(!isChecked || see) && (
        <TouchableOpacity
          style={{ backgroundColor: colors[priority] }}
          onPress={toggleAccordion}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                marginVertical: 0,
                // height: 45,
                // backgroundColor: "#fff",
              }}
            >
              {/* checkbox */}

              <CrossedCheckbox
                label={taskTitle}
                checked={isChecked}
                onPress={handleCheckBox}
                disable={disable}
                color={colorsProgress[priority]}
                colorDisable={colors[priority]}
                listsScreen={false}
              />

              {expanded ? (
                <Ionicons
                  name="chevron-up-outline"
                  size={20}
                  style={{ marginRight: 2 }}
                />
              ) : (
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  style={{ marginRight: 2 }}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                {taskProgress > 0 && (
                  <ProgressBar
                    progress={taskProgress}
                    color={colorsProgress[priority]}
                    style={{
                      height: 5,
                      borderRadius: 20,
                      backgroundColor: "#fff",
                      marginBottom: 3,
                      marginHorizontal: 10,
                    }}
                  />
                )}
              </View>
              {reminder !== "No reminder" && (
                <Ionicons
                  name="notifications-outline"
                  size={15}
                  style={{ paddingRight: 5, marginBottom: 2 }}
                />
              )}
              {repetition !== "One time" && (
                <Ionicons
                  name="repeat-outline"
                  size={15}
                  style={{ paddingRight: 5, marginBottom: 2 }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
      {expanded && (
        // {expanded && !isChecked && (
        <View style={styles.content}>
          {/* description container */}
          {taskDescription && (
            <View style={styles.containerDescription}>
              <Text style={styles.textDescription}>{taskDescription}</Text>
            </View>
          )}
          {taskList.length !== 0 && (
            <CheckboxListInput
              handleTaskList={handleTaskList}
              taskList={taskList}
              handleProgressTask={handleProgressTask}
              disable={disable}
              color={colorsProgress[priority]}
              colorDisable={colors[priority]}
              listsScreen={false}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingTop: 5,
            }}
          >
            <Ionicons
              name="trash-outline"
              style={[styles.button, styles.buttonDelete, styles.textStyle]}
              size={20}
              onPress={() =>
                Alert.alert(
                  "Confirm",
                  `Do you really want to delete ${taskTitle}?`,
                  [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => handleDeleteBtn(),
                    },
                  ],
                  {
                    cancelable: true,
                  }
                )
              }
            ></Ionicons>
            <SetPriority
              index={priority}
              handlePriority={handleSetPriority}
              accordion={true}
            />
            {/* <TouchableOpacity onPress={handleEdit} disabled={disable}> */}
            <Ionicons
              onPress={handleEdit}
              name="pencil"
              style={[
                styles.button,
                styles.buttonEdit,
                styles.textStyle,
                { backgroundColor: "green" },
              ]}
              size={20}
            ></Ionicons>
            {/* </TouchableOpacity> */}
          </View>
        </View>
      )}
      {/* <SetReminder
        valueReminder={reminder}
        handleReminder={false}
        task={taskTitle}
        time={taskTime}
        checkedItems={checkedArray}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#E1F6E8",
    borderRadius: 5,
    elevation: 3,
    width: 280,
    marginBottom: 10,
  },
  containerDescription: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderBottomWidth: 0.2,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
    borderBottomColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  textDescription: {
    fontWeight: "500",
  },

  content: {
    margin: 10,
  },

  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },

  buttonDelete: {
    backgroundColor: "red",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  priority: {
    backgroundColor: "#fff",
    padding: 2,
    width: 30,
    borderRadius: 20,
    alignItems: "center",
  },
});

export default Accordion;
