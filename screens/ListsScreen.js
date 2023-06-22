import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styleScreens";
import AccordionAll from "../navigation/AccordionAll";
import { Searchbar } from "react-native-paper";

const ListsScreen = ({ navigation }) => {
  const [showList, setShowList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const storageName = "todo";
  const [selectedDate, setSelectedDate] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const filteredData = showList.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setRefreshing(true);
    loadTasks();
    retrieveDate();
  }, []);

  const loadTasks = async () => {
    try {
      const value = await AsyncStorage.getItem(storageName);
      if (value !== null) {
        setRefreshing(false);
        const myObject = JSON.parse(value);

        const transformedData = myObject.reduce((sections, task) => {
          const sectionIndex = sections.findIndex(
            (section) => section.title === task.categori
          );
          if (sectionIndex >= 0) {
            sections[sectionIndex].data.push(task);
          } else {
            sections.push({ title: task.categori, data: [task] });
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

  const renderItem = ({ item }) => {
    return (
      <AccordionAll
        key={item.id}
        item={item}
        navigation={navigation}
        remove={removeTask}
        storageName={storageName}
        currentDate={selectedDate}
        seeTasks={true}
        firstList={item.list}
        listsScreen={true}
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
        placeholder="Category name..."
        elevation={3}
        inputStyle={{ fontFamily: "monospace", paddingBottom: 20 }}
        style={{
          height: 40,
          marginBottom: 10,
          marginHorizontal: 30,
          marginTop: 5,
        }}
      />

      <SectionList
        sections={searchQuery ? filteredData : showList}
        renderSectionHeader={({ section: { title: categori } }) => (
          <Text style={styles.header}>{categori}</Text>
        )}
        renderItem={renderItem}
        style={{ padding: 10, marginBottom: 20, backgroundColor: "white" }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={loadTasks}
      />
      <Text style={{ fontSize: 10, fontFamily: "monospace", color: "grey" }}>
        Pull down to refresh
      </Text>
    </View>
  );
};

export default ListsScreen;
