import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LineChart, PieChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";

const StaticticsScreen = ({ navigation }) => {
  const storageName = "todo";
  const [showList, setShowList] = useState();
  const [allTaskCompleted, setAllTaskCompleted] = useState(0);
  const [uncompleted, setUncompleted] = useState(0);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [dataChart, setDataChart] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const dataPie = [
    {
      name: "Completed tasks",
      number: allTaskCompleted,
      color: "#00A989",
      legendFontColor: "black",
      legendFontSize: 10,
    },
    {
      name: "Uncompleted tasks",
      number: uncompleted,
      color: "#E1F6E8",
      legendFontColor: "black",
      legendFontSize: 10,
    },
  ];
  const [dataDay, setDataDay] = useState([0, 0, 0, 0, 0, 0, 0]);
  const labelsDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [navigation]);

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
  // =====================Chart data calc============
  const compareDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    if (showList && showList.length !== 0) {
      let totalTaskCompleted = 0;
      let totalTask = 0;
      const finalData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const taskInMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const finalDataDay = [0, 0, 0, 0, 0, 0, 0];
      const taskInDay = [0, 0, 0, 0, 0, 0, 0];

      showList.forEach((element) => {
        const valTasks = element.checked.filter(
          (t) => compareDate(t.date) <= compareDate(new Date())
        );
        // Total completed Task
        const countTaskDone = valTasks.filter((c) => c.value === true).length;
        totalTaskCompleted += countTaskDone;
        totalTask += valTasks.length;

        // Productiviti by  month
        valTasks.forEach((e) => {
          const d = new Date(e.date);
          const monthShort = d.toLocaleDateString("en-US", {
            month: "short",
          });
          const chartMonth = labels.findIndex((i) => monthShort === i);
          if (chartMonth !== -1) {
            taskInMonth[chartMonth] += 1;
            if (e.value === true) {
              finalData[chartMonth] += 1;
            }
          }
        });

        // Productivity by day
        valTasks.forEach((e) => {
          const d = new Date(e.date);
          const dayShort = d.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const chartDays = labelsDay.findIndex((i) => dayShort === i);
          if (chartDays !== -1) {
            taskInDay[chartDays] += 1;
            if (e.value === true) {
              finalDataDay[chartDays] += 1;
            }
          }
        });
      });
      const days = finalDataDay.map((f, i) => {
        if (taskInDay[i] !== 0) {
          return f / taskInDay[i];
        } else return 0;
      });
      const chartData = finalData.map((f, i) => {
        if (taskInMonth[i] !== 0) {
          return f / taskInMonth[i];
        } else return 0;
      });

      setDataDay(days);
      setDataChart(chartData);
      setAllTaskCompleted(totalTaskCompleted);
      setUncompleted(totalTask - totalTaskCompleted);
    }
  }, [showList, navigation]);
  // --------------------down------Chart view----------

  const dataMonth = {
    labels: labels,
    datasets: [
      {
        data: dataChart,
        color: (opacity = 255) => `rgba(14, 125, 124, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Monthly productivity"],
  };
  const chartDay = {
    labels: labelsDay,
    datasets: [
      {
        data: dataDay,
        color: (opacity = 255) => `rgba(14, 125, 124, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Daily productivity"],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 1,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionTitle}>
          <Ionicons name={"ellipse"} size={10} />
          <Text style={styles.title}>Total tasks completed</Text>
        </View>
        <PieChart
          data={dataPie}
          width={340}
          height={150}
          chartConfig={chartConfig}
          accessor={"number"}
          backgroundColor={"white"}
          paddingLeft={"15"}
          center={[0, 0]}
          absolute
          style={{ borderRadius: 20 }}
        />
        <View style={styles.sectionTitle}>
          <Ionicons name={"ellipse"} size={10} />
          <Text style={styles.title}>Tasks completed in a month</Text>
        </View>
        <LineChart
          data={dataMonth}
          width={340}
          height={180}
          chartConfig={chartConfig}
          bezier
          yAxisSuffix="%"
          style={{
            borderRadius: 20,
          }}
        />
        <View style={styles.sectionTitle}>
          <Ionicons name={"ellipse"} size={10} />
          <Text style={styles.title}>Task completed in weekdays</Text>
        </View>
        <LineChart
          data={chartDay}
          width={340}
          height={180}
          chartConfig={chartConfig}
          bezier
          yAxisSuffix="%"
          style={{
            borderRadius: 20,
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: 100,
    backgroundColor: "#E1F6E8",
    paddingBottom: 90,
  },

  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontFamily: "monospace",
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "flex-start",
    margin: 10,
    borderBottomWidth: 0.5,
  },
});

export default StaticticsScreen;
