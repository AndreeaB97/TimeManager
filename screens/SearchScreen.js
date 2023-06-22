import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styleScreens";
import AccordionAll from "../navigation/AccordionAll";
import { Searchbar } from "react-native-paper";

const SearchScreen = ({ navigation }) => {
  const [showList, setShowList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const storageName = "todo";
  const [selectedDate, setSelectedDate] = useState();

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
  useEffect(() => {
    loadTasks();
    retrieveDate();
  }, []);

  const loadTasks = async () => {
    try {
      const value = await AsyncStorage.getItem(storageName);
      if (value !== null) {
        const myObject = JSON.parse(value);
        setShowList(myObject);
      }
    } catch (error) {
      console.log("Error loading data111: ", error);
    }
  };

  const filteredData = showList.filter((task) =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeTask = async (taskId) => {
    try {
      const existingTasks = await AsyncStorage.getItem(storageName);
      if (existingTasks !== null) {
        const tasks = JSON.parse(existingTasks);
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        await AsyncStorage.setItem(storageName, JSON.stringify(filteredTasks));
        // console.log("Task removed from storage successfully.");
      }
    } catch (error) {
      console.log("Error removing task from storage: ", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <AccordionAll
        item={item}
        navigation={navigation}
        remove={removeTask}
        storageName={storageName}
        currentDate={selectedDate}
        screen={"Search"}
      />
    );
  };

  return (
    <View
      style={[styles.containerList, styles.shadow, { marginHorizontal: 20 }]}
    >
      <StatusBar />
      <Searchbar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Task name..."
        elevation={3}
        inputStyle={{ fontFamily: "monospace", paddingBottom: 20 }}
        style={{
          height: 40,
          marginBottom: 10,
          marginHorizontal: 30,
          marginTop: 5,
        }}
      />
      {searchQuery !== "" ? (
        <FlatList data={filteredData} renderItem={renderItem} />
      ) : (
        <View
          style={{
            ...styles.container,
            marginBottom: 100,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "monospace",
              color: "grey",
              fontWeight: "100",
              fontSize: 16,
              marginBottom: 30,
            }}
          >
            Search after the task name.
          </Text>
          <Image
            source={require("../assets/search-alt.png")}
            style={{
              width: 50,
              height: 50,
              opacity: 0.5,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
