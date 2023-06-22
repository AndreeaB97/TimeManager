import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CrossedCheckbox from "../components/CrossedCheckbox";

const Accordion = (props) => {
  const item = props.item;
  const id = item.id;
  const taskTitle = item.task;
  const taskDescription = item.description;
  const taskCategory = item.categori;
  const firstList = Object.freeze(item.list);
  const date = item.date;
  const taskProgress = item.progress;
  const taskList = firstList;
  const isChecked = item.value;
  const checkedArray = item.checked;
  const taskTime = item.time;
  const navigation = props.navigation;
  const [expanded, setExpanded] = useState(false);
  const reminder = item.reminder;
  const repetition = item.repetition;
  const priority = item.priority;
  const disable = false;
  const colors = ["#ABC1F8", "#B3F9B3", "#FFA9A3"];
  const colorsProgress = ["#008DFF", "#19D619", "#FF1D0B"];

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
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
      screen: props.screen,
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
      routes: [{ name: "Lists" }],
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          marginBottom: 4,
        }}
      >
        <Text>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors[priority] }]}>
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
              marginVertical: 2,
            }}
          >
            {/* checkbox */}
            <CrossedCheckbox
              label={taskTitle}
              checked={isChecked}
              disable={disable}
              color={colorsProgress[priority]}
              colorDisable={colors[priority]}
              listsScreen={true}
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
              justifyContent: "flex-start",
              marginLeft: 10,
            }}
          >
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

      {expanded && (
        <View style={styles.content}>
          {/* description container */}
          {taskDescription && (
            <View style={styles.containerDescription}>
              <Text style={styles.textDescription}>{taskDescription}</Text>
            </View>
          )}
          {taskList.length !== 0 && (
            <FlatList
              data={taskList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
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
            />
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
            />
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
});

export default Accordion;
