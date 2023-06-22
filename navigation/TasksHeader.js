// Tasks Screen Header with date picker
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, Divider } from "react-native-paper";
import "intl";
import "intl/locale-data/jsonp/en";

const TasksHeader = ({
  selectedDate,
  handleDateChange,
  navigation,
  handleCompletedTasks,
}) => {
  const [date, setDate] = useState(selectedDate);
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");
  const [menuView, setMenuView] = useState(false);

  const toggleViewTasks = () => {
    closeMenu();
    handleCompletedTasks();
    setMenuView(!menuView);
  };

  const dateInt = new Intl.DateTimeFormat("en", {
    year: "numeric",
    weekday: "long",
  }).format(date);

  const showDatePicker = () => {
    setShowPicker(true);
    // setMode(currentMode);
  };

  if (selectedDate !== date) {
    setDate(selectedDate);
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    handleDateChange(currentDate);
    setShowPicker(false);
  };

  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Toate notificările programate au fost anulate.");
  };

  const clearAsyncStorage = () => {
    closeMenu();

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete all tasks from the app?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // await AsyncStorage.removeItem("todo");
              await AsyncStorage.clear();
              // console.log(`AsyncStorage cleared after key: `);
              navigation.reset({
                routes: [{ name: "Tasks" }],
              });
            } catch (error) {
              console.error("Error clearing AsyncStorage:", error);
            }
          },
        },
      ]
    );
  };
  const clearAsyncNotifications = () => {
    closeMenu();

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete all notifications from the app?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await cancelAllNotifications();
              // console.log(`AsyncStorage cleared after key: `);
              // navigation.reset({
              //   routes: [{ name: "Tasks" }],
              // });
            } catch (error) {
              console.error("Error clearing AsyncStorage:", error);
            }
          },
        },
      ]
    );
  };

  const today = () => {
    closeMenu();
    const currentDate = new Date();
    setDate(currentDate);
    handleDateChange(currentDate);
  };
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

        width: 350,
      }}
    >
      <TouchableOpacity style={styles.header} onPress={showDatePicker}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",

            alignItems: "center",
            marginLeft: 5,
          }}
        >
          <Ionicons name="today-outline" size={25} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              width: 240,
              marginLeft: 10,
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            {dateInt}
          </Text>
        </View>
      </TouchableOpacity>

      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <View
                style={{
                  borderRadius: 50,
                  paddingVertical: 3,
                  margin: 5,
                }}
              >
                <Ionicons name="ellipsis-vertical" size={30} />
              </View>
            </TouchableOpacity>
          }
          anchorPosition="bottom"
          statusBarHeight={-55}
          contentStyle={{ backgroundColor: "#fff", marginLeft: -32 }}
        >
          <View style={[styles.menuIcon, { paddingTop: 0 }]}>
            <Ionicons name="today-outline" size={20} />
            <Menu.Item onPress={today} title="Today" style={styles.menuItem} />
          </View>
          <View style={styles.menuIcon}>
            <Ionicons name="eye-outline" size={20} />
            <Menu.Item
              onPress={toggleViewTasks}
              title={!menuView ? "Show completed" : "Hide completed"}
              style={[styles.menuItem, { marginBottom: 5 }]}
            />
          </View>
          <Divider />
          <View style={styles.menuIcon}>
            <Ionicons
              name="notifications-off-outline"
              color={"red"}
              size={20}
            />
            <Menu.Item
              onPress={clearAsyncNotifications}
              title="Clean notifications"
              style={styles.menuItem}
            />
          </View>
          <View style={styles.menuIcon}>
            <Ionicons name="trash" color={"red"} size={20} />
            <Menu.Item
              onPress={clearAsyncStorage}
              title="Delete all"
              style={styles.menuItem}
            />
          </View>
        </Menu>
      </View>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display={"default"}
          maximumDate={new Date(2030, 12, 30)}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E1F6E8",
    // backgroundColor: "#C5FCEE",
    // borderColor: "#8fcbbc",
    borderWidth: 0.1,
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 300,
  },
  menuItem: {
    height: 25,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  menuIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingLeft: 10,
  },
});

export default TasksHeader;
