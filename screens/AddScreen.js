import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import styles from "./styleScreens";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimeReminder from "../components/DateTimeReminder";
import TasksModal from "../navigation/tasksModal";
import "intl";
import "intl/locale-data/jsonp/en";
import CategoryDropDown from "../components/CategoryDropDown";
import CheckboxAddListInput from "../components/CheckboxAddListInput";
import SetReminder from "../components/SetReminder";
import SetRepetition from "../components/SetRepetition";
import SetPriority from "../components/SetPriority";
import ChartTasks from "../components/ChartTasks";
import uuid from "react-native-uuid";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import triggerTime from "./NotificationTime";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const focusColor = "#2F4858";

const AddScreen = ({ navigation, route }) => {
  const storageName = "todo";
  let jsonString = route.params?.jsonString; //accordion params
  const add = {
    id: uuid.v4(),
    category: "",
    title: "",
    notes: "",
    list: [],
    progress: 0,
    date: new Date(),
    time: new Date(),
    reminder: "No reminder",
    repetition: "One time",
    priority: 0,
    ischecked: false,
    checked: [],
  };
  let parsedData = jsonString ? JSON.parse(jsonString) : add;
  const id = parsedData.id;
  const [categori, setCategori] = useState(parsedData.category);
  const [task, setTask] = useState(parsedData.title);
  const [description, setDescription] = useState(parsedData.notes);
  const [progressTask, setProgressTask] = useState(parsedData.progress);
  const [dateTask, setDateTask] = useState(new Date(parsedData.date));
  const [taskList, setTaskList] = useState(parsedData.list);
  const [visible, setVisible] = useState(false);
  const [textPopup, setTextPopup] = useState();
  const [timeTask, setTimeTask] = useState(new Date(parsedData.time));
  const [setChecked, setSetChecked] = useState(parsedData.ischecked);
  const [checkedArray, setCheckedArray] = useState(parsedData.checked);
  const [setReminder, setSetReminder] = useState(parsedData.reminder);
  const [setRepetition, setSetRepetition] = useState(parsedData.repetition);
  const [setPriority, setSetPriority] = useState(parsedData.priority);
  // console.log(parsedData.screen);
  // console.log("Addtime:", timeTask);
  // console.log("AddData:", dateTask);
  // ============================================================
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.date);
        if (notificationDate > now) {
          setNotification(notification);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("respons", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // ==========================================================

  useEffect(() => {
    parsedData = jsonString ? JSON.parse(jsonString) : add;
  }, [navigation]);

  const compareDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const getData = async () => {
    try {
      const date = await AsyncStorage.getItem("selectedDate");
      return new Date(JSON.parse(date));
    } catch (error) {
      console.log("Eroare la obținerea datei:", error);
      return null;
    }
  };

  const retrieveDate = async () => {
    const date = await getData();
    if (compareDate(date) < compareDate(new Date())) {
      setDateTask(new Date());
    } else {
      setDateTask(date);
    }

    return date;
  };

  const storeDate = async (date) => {
    try {
      await AsyncStorage.setItem("selectedDate", JSON.stringify(date));
    } catch (error) {
      console.log("Eroare la memorarea datei:", error);
    }
  };

  useEffect(() => {
    if (!parsedData.screen) {
      retrieveDate();
      setNewObjectDay({
        ...newObjectDay,
        date: dateTask,
      });
    }
  }, []);

  // const previousParsedDataRef = useRef(parsedData);

  // useEffect(() => {
  //   const previousParsedData = previousParsedDataRef.current;

  //   if (previousParsedData !== parsedData) {
  //     // Valoarea lui taskChecked s-a schimbat
  //     parsedData = jsonString ? JSON.parse(jsonString) : add;
  //     // console.log("parsedData s-a schimbat:", parsedData);
  //     // Aici poți face orice acțiune necesară în urma schimbării valorii lui taskChecked

  //     // Actualizează referința către valoarea anterioară a lui taskChecked
  //     previousParsedDataRef.current = parsedData;
  //   }
  // }, [parsedData]);

  const [newObjectDay, setNewObjectDay] = useState({
    value: setChecked,
    date: dateTask,
    list: taskList,
    expended: false,
    progress: progressTask,
  });

  // date for edit to ADDScreen
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const dateIntl = (date) => {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const timeIntl = (time) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    const locale = "en";
    // Format the current time
    const formattedTime = new Intl.DateTimeFormat(locale, options).format(time);
    return formattedTime;
  };

  const handleDateChange = (date) => {
    setDateTask(date);
    setNewObjectDay({
      ...newObjectDay,
      date: date,
    });
  };

  const handleTimeChange = (time) => {
    setTimeTask(time);
    // if (timeAccordion) {
    //   setTimeAccordion(time);
    // }
  };

  const handleShowPicker = (show) => {
    setShowPicker(show);
  };

  const handleShowTimePicker = (show) => {
    setShowTimePicker(show);
  };

  const resetScreen = () => {
    setTimeout(() => {
      if (parsedData.screen === "Lists") {
        navigation.reset({
          routes: [{ name: "Lists" }],
        });
      } else {
        navigation.reset({
          routes: [{ name: "Tasks" }],
        });
      }
    }, 800);
  };

  const toggle = () => {
    setVisible(true);
  };

  function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }

    return array1.every((item1) => {
      const index = array2.findIndex((item2) => {
        return item2.value === item1.value && item2.label === item1.label;
      });

      return index !== -1;
    });
  }

  const updateCheckedArray = () => {
    const d = new Date(newObjectDay.date);
    const existingTaskIndex = checkedArray.findIndex((item) => {
      const dateHere = compareDate(item.date);
      return dateHere === compareDate(d);
    });
    // console.log(`EEEEEEEEEEEEEEEEEE`, existingTaskIndex);
    if (existingTaskIndex !== -1) {
      const newArray = checkedArray;
      newArray[existingTaskIndex] = newObjectDay;
      setCheckedArray(newArray);
    } else {
      const newArray = [...checkedArray, newObjectDay];
      setCheckedArray(newArray);
    }

    alterListTasks();
  };
  const equalLists = compareArrays(parsedData.list, taskList);

  const alterListTasks = () => {
    const d = new Date(newObjectDay.date);
    if (taskList.length !== 0 && !equalLists) {
      // console.log(`equalLists)))))`, equalLists);
      // console.log(`-------------------------`);
      const newCheckedArray = checkedArray.map((obj) => {
        const dateHere = compareDate(new Date(obj.date));
        if (dateHere >= compareDate(d)) {
          const array1 = [...obj.list];
          const array2 = [...taskList];

          const newArray = array2.map((obj2) => {
            const matchingObj = array1.find(
              (obj1) => obj1.label === obj2.label
            );
            if (matchingObj) {
              return { ...obj2, checked: matchingObj.checked };
            } else {
              return obj2;
            }
          });
          // console.log(`newArray`, newArray);
          const countChecked = newArray.filter(
            (item) => item.checked === true
          ).length;
          const prog = countChecked / newArray.length;
          // console.log(`prog`, prog);
          setProgressTask(prog);
          if (prog < 1) setSetChecked(false);
          return {
            ...obj,
            list: newArray,
            progress: prog,
            value: setChecked,
          };
        } else {
          // console.log(`ELSELLLLL:`, itemC);
          return obj;
        }
      });
      // console.log(`NEWARRRAYYYYYY:`, newCheckedArray);
      setCheckedArray(newCheckedArray);
      // storeData(newArray);
    }
  };

  const storeTask = async () => {
    try {
      if (categori && task) {
        const taskObj = {
          id: id,
          categori: categori,
          task: task,
          description: description,
          list: taskList,
          progress: progressTask,
          date: dateTask,
          time: timeTask,
          repetition: setRepetition,
          priority: setPriority,
          reminder: setReminder,
          checked:
            setRepetition === parsedData.repetition
              ? checkedArray
              : [newObjectDay],
        };
        const existingTasks = await AsyncStorage.getItem(storageName);
        const tasks = existingTasks ? JSON.parse(existingTasks) : [];
        const existingTaskIndex = tasks.findIndex((item) => item.id === id);
        if (existingTaskIndex !== -1) {
          // inlocuire obiect existent cu datele actualizate
          tasks[existingTaskIndex] = taskObj;
          await AsyncStorage.setItem(storageName, JSON.stringify(tasks));
        } else {
          tasks.push(taskObj);
          await AsyncStorage.setItem(storageName, JSON.stringify(tasks));
        }
        storeDate(dateTask);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error storing data: ", error);
    }
  };

  // console.log("ObjectDayCheckemarkBefore:", newObjectDay);

  const handleCheckmark = async () => {
    const goBack = await storeTask();
    if (goBack) {
      setTextPopup(true);
      toggle();
      resetScreen();
    } else {
      toggle();
      setTextPopup(false);
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  };

  // delete from storage 9.05
  const handleClose = () => {
    resetScreen();
  };

  const handleChangeCategori = (value) => {
    setCategori(value);
  };

  // Task list
  const handleAddTaskList = (listO) => {
    setTaskList(listO);
  };

  const handleSetReminder = async (value) => {
    setSetReminder(value);
    if (value !== "No reminder") {
      await schedulePushNotification(
        task,
        timeTask,
        value,
        setRepetition,
        expoPushToken,
        id
      );
    }
  };

  const handleSetRepetition = (value) => {
    setSetRepetition(value);
  };

  const handleSetPriority = (value) => {
    setSetPriority(value);
  };
  // useEFFECTS--------------
  useEffect(() => {
    if (
      setRepetition !== parsedData.repetition ||
      timeTask !== parsedData.time
    ) {
      setSetReminder("No reminder");
    }
  }, [setRepetition, timeTask]);

  useEffect(() => {
    setNewObjectDay({
      ...newObjectDay,
      list: taskList,
    });
  }, [taskList]);

  useEffect(() => {
    updateCheckedArray();
  }, [newObjectDay]);

  // ======================
  // console.log(`rrrr`, setReminder);
  return (
    <Animatable.View animation="lightSpeedIn" style={styles.container}>
      <StatusBar />
      <Text style={{ fontSize: 25, margin: 10, fontFamily: "monospace" }}>
        What whould you like to add?
      </Text>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: "#C2FCF4",
          justifyContent: "space-between",
          width: 360,
          borderRadius: 20,
        }}
      >
        {/* DropDownSelect */}
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            zIndex: 1,
            height: 40,
          }}
        >
          <CategoryDropDown
            categori={categori}
            handleChangeCategori={handleChangeCategori}
          />
        </View>
        {/* ====== */}
        {/* Task title and notes, list----------- */}
        <View style={styles.taskContainer}>
          <TextInput
            style={styles.inputTask}
            onChangeText={setTask}
            placeholder="Task title..."
            value={task}
          />
          <TextInput
            multiline
            style={styles.inputNotes}
            onChangeText={setDescription}
            placeholder="Notes..."
            value={description}
            scrollEnabled
          />
          <CheckboxAddListInput
            handleTaskList={handleAddTaskList}
            taskList={taskList}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {/* datepicker ---------timePicker--------*/}
          <View style={styles.reminderContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.textReminder}>When</Text>
              <TouchableOpacity
                style={{
                  ...styles.reminderBtn,
                  width: 180,
                }}
                onPress={handleShowPicker}
              >
                <Ionicons
                  name="calendar-outline"
                  size={23}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.textTouchable}>{dateIntl(dateTask)}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.textReminder}>Time</Text>
              <TouchableOpacity
                style={styles.reminderBtn}
                onPress={handleShowTimePicker}
              >
                <Ionicons
                  name="alarm-outline"
                  size={25}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.textTouchable}>{timeIntl(timeTask)}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {showPicker && (
            <DateTimeReminder
              selected={dateTask}
              handleChange={handleDateChange}
              show={handleShowPicker}
              mode={"date"}
            />
          )}
          {showTimePicker && (
            <DateTimeReminder
              selected={timeTask}
              handleChange={handleTimeChange}
              show={handleShowTimePicker}
              mode={"time"}
              screen={parsedData.screen}
            />
          )}
          {/* Set reminder with notifications */}
          <SetReminder
            valueReminder={setReminder}
            handleReminder={handleSetReminder}
          />
          {/* Repetition */}
          <SetRepetition
            valueRepetition={setRepetition}
            handleRepetition={handleSetRepetition}
          />
          {/* Priority */}
          <SetPriority
            index={setPriority}
            handlePriority={handleSetPriority}
            accordion={false}
          />
          {/* Chart for completed task */}
          <ChartTasks checked={parsedData.checked} repetition={setRepetition} />
        </ScrollView>
      </View>
      {/* Buttons -----*/}
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "90%",
        }}
      >
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={40} color={focusColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCheckmark}>
          <Ionicons name="checkmark-circle" size={50} color={focusColor} />
        </TouchableOpacity>
      </View>
      {/* ------------- */}
      {visible && <TasksModal visible={visible} message={textPopup} />}
    </Animatable.View>
  );
};

async function schedulePushNotification(
  task,
  time,
  title,
  repetition,
  expoPushToken,
  id
) {
  const trigger = triggerTime(time, title, repetition);

  await Notifications.scheduleNotificationAsync({
    indentifier: id,
    content: {
      to: expoPushToken,
      sound: "default",
      title: "Time Manager",
      body: title + " " + "it's time to: \n" + task,
    },
    trigger: trigger,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log(`granded`);
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default AddScreen;
