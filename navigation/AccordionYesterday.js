import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProgressBar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

import { ScrollView } from "react-native-gesture-handler";

const AccordionYesterday = (props) => {
  const item = props.item;
  const taskTitle = item.task;
  const taskDescription = item.description;
  const firstList = Object.freeze(props.firstList);
  const [taskProgress, setTaskProgress] = useState(0);
  const taskChecked = item.checked;
  // const [isChecked, setIsChecked] = useState(props.check);
  const [isChecked, setIsChecked] = useState(taskChecked[0].value);
  // const listTask = props.checkList;
  const listTask = taskChecked[0].list;
  const [taskList, setTaskList] = useState(listTask);
  const navigation = props.navigation;
  const [expanded, setExpanded] = useState(false);
  const reminder = item.reminder;
  const repetition = item.repetition;
  const priority = item.priority;
  const currentDate = props.currentDate;
  const disable = true;

  const compareDate = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const daysAccordion = (dateO) => {
    if (taskChecked.length !== 0) {
      const matchingItem = taskChecked.find(
        (itemO) => compareDate(dateO) === compareDate(itemO.date)
      );
      // console.log(`MA`, matchingItem);
      if (matchingItem) {
        setIsChecked(matchingItem.value);
        setTaskList(matchingItem.list);
        setExpanded(false);
        setTaskProgress(matchingItem.progress);
      } else {
        // console.log(`FALSE`);
        setIsChecked(false);
        setTaskList(firstList);
        setTaskProgress(0);
        setExpanded(false);
      }
    }
  };
  const isFocused = useIsFocused();

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const refresh = async () => {
      await props.currentDate;
      if (currentDate !== props.currentDate) {
        navigation.reset({
          routes: [{ name: "Tasks" }],
        });
      }
    };
    refresh();
  }, [props.currentDate]);

  useEffect(() => {
    if (isFocused) {
      daysAccordion(currentDate);
    }
  }, [isFocused, currentDate, navigation]);

  useEffect(() => {
    daysAccordion(currentDate);
  }, [currentDate]);

  const colors = ["#ABC1F8", "#B3F9B3", "#FFA9A3"];
  const colorsProgress = ["#008DFF", "#19D619", "#FF1D0B"];

  const [see, setSee] = useState(false);
  useEffect(() => {
    setSee(props.seeTasks);
  }, [props.seeTasks]);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          marginBottom: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            checked={item.checked}
            checkedColor={disable ? colors[priority] : colorsProgress[priority]}
            containerStyle={{ margin: 0, padding: 2 }}
            disabled={disable}
            uncheckedColor={disable ? "#D9DAFF" : colors[priority]}
          />

          <Text style={{ opacity: 0.7 }}>{item.label}</Text>
        </View>
      </View>
    );
  };
  const i = ["!", "!!", "!!!"];
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
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: 220,
                  // backgroundColor: "red",
                }}
              >
                <CheckBox
                  checked={isChecked}
                  uncheckedColor={colorsProgress[priority]}
                  // checkedColor={{ opacity: 0.5 }}
                  checkedColor={colorsProgress[priority]}
                  containerStyle={{
                    marginLeft: 0,
                    marginRight: 0,
                    marginVertical: -5,
                    opacity: 0.5,
                  }}
                  disabled={disable}
                />
                <Text
                  // numberOfLines={1}
                  style={{
                    textDecorationLine: isChecked ? "line-through" : "none",
                    textDecorationStyle: isChecked ? "double" : null,
                    marginLeft: -5,
                    fontWeight: isChecked ? "400" : "bold",
                    fontSize: 16,
                    fontFamily: "monospace",
                    opacity: 0.6,
                  }}
                >
                  {taskTitle}
                </Text>
              </View>

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
                      opacity: 0.5,
                    }}
                  />
                )}
              </View>
              {reminder !== "No reminder" && (
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  style={{ paddingLeft: 1 }}
                />
              )}
              {repetition !== "One time" && (
                <Ionicons
                  name="repeat-outline"
                  size={20}
                  style={{ paddingLeft: 1 }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
      {expanded && !isChecked && (
        <View style={styles.content}>
          {/* description container */}
          {taskDescription && (
            <View style={styles.containerDescription}>
              <Text style={styles.textDescription}>{taskDescription}</Text>
            </View>
          )}
          {taskList.length !== 0 && (
            <View style={{ maxHeight: 100 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={taskList}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={true}
                />
              </ScrollView>
            </View>
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
                  `Do you really want to delete the task with the title${taskTitle}? `,
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

            {/* <SetPriority
              index={priority}
              handlePriority={handleSetPriority}
              accordion={true}
            /> */}
            <TouchableOpacity
              style={[
                styles.priorityBtn,
                {
                  backgroundColor: "green",
                  opacity: 0.5,
                  marginLeft: 0,
                },
              ]}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
                {i[priority]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={disable}>
              <Ionicons
                name="pencil"
                style={[
                  styles.button,
                  styles.buttonEdit,
                  styles.textStyle,
                  { backgroundColor: "green", opacity: 0.5 },
                ]}
                size={20}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  priorityBtn: {
    backgroundColor: "green",
    width: 35,
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: "center",
    marginLeft: 10,
  },
});

export default AccordionYesterday;
