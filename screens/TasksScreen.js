import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styleScreens";
import Accordion from "../navigation/Accordion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TasksHeader from "../navigation/TasksHeader";
import * as Animatable from "react-native-animatable";
import AccordionYesterday from "../navigation/AccordionYesterday";
import { Use } from "react-native-svg";

const TasksScreen = ({ navigation }) => {
  const storageName = "todo";
  // tasks from storage
  const [selectedDate, setSelectedDate] = useState(null);
  const [showList, setShowList] = useState([]);
  const [seeTasks, setSeeTasks] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (selectedDate === null) {
      storeData(new Date());
    } else {
      storeData(selectedDate);
    }
  }, []);

  useEffect(() => {
    retrieveDate();
    if (selectedDate === null) {
      storeData(new Date());
    } else {
      storeData(selectedDate);
    }
    loadTasks();
  }, [navigation]);

  // useEffect(() => {
  //   // retrieveDate();
  //   if (isFocused) {
  //     // loadTasks();
  //     // setRefreshing(true);
  //   }
  // }, [isFocused]);

  useEffect(() => {
    loadTasks();
  }, [selectedDate, seeTasks]);

  const loadTasks = async () => {
    try {
      const value = await AsyncStorage.getItem(storageName);
      if (value !== null && selectedDate !== null) {
        setRefreshing(false);
        const myObject = JSON.parse(value);
        const currentDate = selectedDate.toISOString().split("T")[0];
        const filteredTasks = myObject.filter((task) => {
          const taskDate = task.date ? task.date.split("T")[0] : null;
          const date = new Date(taskDate);
          const isDateMatch =
            task.repetition === "One time" && taskDate === currentDate;
          const isRepetitionDaily = task.repetition === "Daily";
          const isRepetitionWeekly =
            task.repetition === "Weekly" &&
            date.getDay() === new Date(currentDate).getDay();
          const isRepetitionMonthly =
            task.repetition === "Monthly" &&
            taskDate &&
            date.getDate() === new Date(currentDate).getDate();
          const isRepetitionYearly =
            task.repetition === "Yearly" &&
            taskDate &&
            date.getMonth() === new Date(currentDate).getMonth() &&
            date.getDate() === new Date(currentDate).getDate();
          return (
            isDateMatch ||
            isRepetitionDaily ||
            isRepetitionWeekly ||
            isRepetitionMonthly ||
            isRepetitionYearly
          );
        });
        const transformedData = filteredTasks.reduce((sections, task) => {
          const sectionIndex = sections.findIndex(
            (section) => section.title === task.categori
          );
          const data = task.checked.filter(
            (item) => compareDate(item.date) === compareDate(selectedDate)
          );
          const checkData =
            data.length === 0 &&
            compareDate(task.date) <= compareDate(selectedDate)
              ? [
                  {
                    date: selectedDate,
                    value: false,
                    list: task.list,
                    progress: 0,
                  },
                ]
              : data;
          if (sectionIndex >= 0) {
            const finalData = { ...task, checked: checkData };
            sections[sectionIndex].data.push(finalData);
          } else if (compareDate(task.date) >= compareDate(new Date())) {
            const finalData = { ...task, checked: checkData };
            sections.push({ title: task.categori, data: [finalData] });
          } else if (compareDate(task.date) < compareDate(new Date())) {
            const finalData = { ...task, checked: checkData };
            sections.push({ title: task.categori, data: [finalData] });
          }
          return sections;
        }, []);
        setShowList(transformedData);
      }
    } catch (error) {
      console.log("Error loading data1: ", error);
      setRefreshing(true);
    }
  };
  // AsynStorage for selected date------------
  const storeData = async (date) => {
    try {
      await AsyncStorage.setItem("selectedDate", JSON.stringify(date));
    } catch (error) {
      console.log("Eroare la memorarea datei:", error);
    }
  };

  // const updateData = async (newDate) => {
  //   try {
  //     await AsyncStorage.setItem("selectedDate", JSON.stringify(newDate));
  //   } catch (error) {
  //     console.log("Eroare la actualizarea datei:", error);
  //   }
  // };
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
    setSelectedDate(date);
    return date;
  };

  // ---------------
  // dateTimePicker
  const handleDateChange = (date) => {
    storeData(new Date(date));
    retrieveDate();
    setRefreshing(true);
    // setSelectedDate(date);
  };
  // arrow left
  const handleDateBack = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      storeData(newDate);
      retrieveDate();
      setRefreshing(true);
      // setSelectedDate(newDate);
    }
  };
  // arrow right
  const handleDateForward = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      storeData(newDate);
      retrieveDate();
      setSelectedDate(newDate);
      setRefreshing(true);
      // navigation.reset({
      //   routes: [{ name: "Tasks" }],
      // });
    }
  };

  // delete from storage after task name
  const removeTask = async (taskId) => {
    try {
      const existingTasks = await AsyncStorage.getItem(storageName);
      if (existingTasks !== null) {
        const tasks = JSON.parse(existingTasks);
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        await AsyncStorage.setItem(storageName, JSON.stringify(filteredTasks));
      }
    } catch (error) {
      console.log("Error removing task from storage: ", error);
    }
  };
  // removeTask("Adf");
  const handleCompletedTasks = () => {
    setSeeTasks(!seeTasks);
  };

  const EmptyListComponent = () => {
    return (
      <View
        style={{
          ...styles.container,
          height: 600,
          borderRadius: 20,
          backgroundColor: "#E1F6E8",
          marginHorizontal: 10,
          marginVertical: 5,
          width: 280,
          ...styles.shadow,
        }}
      >
        {/* {compareDate(new Date()) <= compareDate(selectedDate) ? ( */}
        <Image
          source={require("../assets/calendar-lines-pen.png")}
          style={{
            width: 50,
            height: 50,
            marginBottom: 30,
            opacity: 0.5,
          }}
        />
        {/* ) : ( */}
        {/* <Image
            source={require("../assets/calendar-xmark.png")}
            style={{
              width: 50,
              height: 50,
              marginBottom: 30,
              opacity: 0.5,
            }}
          />
        )} */}
        <Text
          style={{
            ...styles.title,
            fontSize: 15,
            textAlign: "center",
            textShadowColor: "rgba(0, 0, 0, 0.1)", // Set the text shadow color
            textShadowOffset: { width: 2, height: 2 }, // Set the text shadow offset
            textShadowRadius: 3,
            // backgroundColor: "red",
            marginHorizontal: 50,
            opacity: 0.5,
            fontFamily: "monospace",
          }}
        >
          Start by adding tasks !
          {/* {compareDate(new Date()) <= compareDate(selectedDate)
            ? "Nothing to do this day, add something to do!"
            : "The day has passed!"} */}
        </Text>
      </View>
    );
  };

  const compareDate = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return (
    <Animatable.View animation="lightSpeedIn" style={styles.tasksScreen}>
      <StatusBar />
      <View style={styles.iconBtn}>
        <TouchableOpacity style={styles.iconArrow} onPress={handleDateBack}>
          <Ionicons
            name="chevron-back-circle"
            style={{ fontSize: 50, color: "#00A989" }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.containerList, ...styles.shadow }}>
        <TasksHeader
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          navigation={navigation}
          handleCompletedTasks={handleCompletedTasks}
        />
        {/* 11.05.2023-============================================ */}
        {showList.length !== 0 ? (
          <SectionList
            sections={showList}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => {
              if (item.checked.length !== 0) {
                return item.checked.map((c) => {
                  const keyDate = new Date(c.date);
                  if (compareDate(c.date) >= compareDate(new Date())) {
                    return (
                      <Accordion
                        key={`${item.id}-${keyDate.getTime()}`}
                        item={item}
                        checked={c}
                        navigation={navigation}
                        remove={removeTask}
                        storageName={storageName}
                        currentDate={selectedDate}
                        seeTasks={seeTasks}
                        firstList={item.list}
                      />
                    );
                  } else {
                    return (
                      <AccordionYesterday
                        key={`${item.id}-${keyDate.getTime()}`}
                        item={item}
                        checked={c}
                        navigation={navigation}
                        remove={removeTask}
                        storageName={storageName}
                        currentDate={selectedDate}
                        seeTasks={seeTasks}
                        firstList={item.list}
                      />
                    );
                  }
                });
              }
            }}
            renderSectionHeader={({ section: { title: categori, data } }) => {
              const mapData = data.find((item) => {
                return item.categori === categori;
              });
              if (mapData.checked.length !== 0)
                return <Text style={[styles.header]}>{categori}</Text>;
            }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            onViewableItemsChanged={loadTasks}
            refreshing={refreshing}
            onRefresh={loadTasks}
          />
        ) : (
          <EmptyListComponent />
        )}

        <Text style={{ fontSize: 10, fontFamily: "monospace", color: "grey" }}>
          Pull down to refresh
        </Text>
      </View>

      <View style={styles.iconBtn}>
        <TouchableOpacity onPress={handleDateForward} style={styles.iconArrow}>
          <Ionicons
            name="chevron-forward-circle"
            style={{ fontSize: 50, color: "#00A989", paddingLeft: 3 }}
          />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

export default TasksScreen;
