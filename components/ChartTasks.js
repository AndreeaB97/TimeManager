import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { View } from "react-native";

const ChartTasks = ({ checked, repetition }) => {
  const [dataForChart, setDataForChart] = useState([0]);
  const [labels, setLabels] = useState([]);
  const [legend, setLegend] = useState("Progress");
  useEffect(() => {
    if (repetition === "Daily") {
      handleChart();
    }
    if (repetition === "Monthly" || repetition === "Weekly") {
      handleChartMonthly();
    }
    if (repetition === "Yearly" || repetition === "One time") {
      setLegend("Empty chart");
    }
  }, []);

  const getNumberOfdaysInMonth = (year, month, dayT) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let count = 0;
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === dayT) {
        // 2 reprezintă marțea (duminică = 0, luni = 1, marți = 2, etc.)
        count++;
      }
    }

    return count;
  };

  const handleChart = () => {
    setLabels(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    setDataForChart([0, 0, 0, 0, 0, 0, 0]);

    setLegend("Daily progress");

    if (checked.length !== 0) {
      // const dateObj = date ? dateAccordion : dateTask;

      const chartData = [
        { day: "Mon", value: 0, count: 1 },
        { day: "Tue", value: 0, count: 1 },
        { day: "Wed", value: 0, count: 1 },
        { day: "Thu", value: 0, count: 1 },
        { day: "Fri", value: 0, count: 1 },
        { day: "Sat", value: 0, count: 1 },
        { day: "Sun", value: 0, count: 1 },
      ];

      checked.forEach((item) => {
        // console.log(`item`, item);
        if (item.length !== 0) {
          const date = new Date(item.date);

          const dayShort = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const dayObj = chartData.findIndex((d) => dayShort === d.day);
          // console.log(`dayObj`, dayObj);
          if (dayObj !== -1) {
            const valueData = chartData[dayObj].value;
            const countData = chartData[dayObj].count;
            chartData[dayObj].count += 1;
            const res = valueData + item.progress;
            if (chartData[dayObj].count !== 0) {
              chartData[dayObj].value = res / countData;
            } else {
              chartData[dayObj].value = res;
            }
          }
        }
      });
      const newArray = chartData.map((v) => v.value);
      // console.log("arradata:", newArray);
      setDataForChart(newArray);
    }
  };

  const handleChartMonthly = () => {
    if (checked.length !== 0) {
      setLabels([
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
      ]);
      // const dateObj = date ? dateAccordion : dateTask;

      const chartData = [
        { month: "Jan", value: 0, count: 1 },
        { month: "Feb", value: 0, count: 1 },
        { month: "Mar", value: 0, count: 1 },
        { month: "Apr", value: 0, count: 1 },
        { month: "May", value: 0, count: 1 },
        { month: "Jun", value: 0, count: 1 },
        { month: "Jul", value: 0, count: 1 },
        { month: "Aug", value: 0, count: 1 },
        { month: "Sep", value: 0, count: 1 },
        { month: "Oct", value: 0, count: 1 },
        { month: "Nov", value: 0, count: 1 },
        { month: "Dec", value: 0, count: 1 },
      ];
      if (repetition === "Monthly") {
        setLegend("Monthly progress");
        checked.forEach((item) => {
          if (item.length !== 0) {
            const date = new Date(item.date);

            const monthShort = date.toLocaleDateString("en-US", {
              month: "short",
            });
            const dayObj = chartData.findIndex((d) => {
              return monthShort === d.month;
            });
            if (dayObj !== -1) {
              const valueData = chartData[dayObj].value;
              const countData = chartData[dayObj].count;
              chartData[dayObj].count += 1;
              const res = valueData + item.progress;
              if (chartData[dayObj].count !== 0) {
                chartData[dayObj].value = res / countData;
              } else {
                chartData[dayObj].value = res;
              }
            }
          }
        });
        const newArray = chartData.map((v) => v.value);
        setDataForChart(newArray);
      }

      if (repetition === "Weekly") {
        setLegend("Weekly progress");

        checked.forEach((item) => {
          if (item.length !== 0) {
            const date = new Date(item.date);

            const monthShort = date.toLocaleDateString("en-US", {
              month: "short",
            });

            const dayObj = chartData.findIndex((d) => {
              return monthShort === d.month;
            });
            console.log(dayObj);
            if (dayObj !== -1) {
              const month = date.getMonth();
              const year = date.getFullYear();
              const day = date.getDay();
              const numberOfDay = getNumberOfdaysInMonth(year, month, day);
              const valueData = chartData[dayObj].value;
              chartData[dayObj].count = numberOfDay;
              const res = valueData + item.progress;
              chartData[dayObj].value = res / numberOfDay;
            }
          }
        });
        const newArray = chartData.map((v) => v.value);
        setDataForChart(newArray);
      }
    }
  };

  const dataChart = {
    labels: labels,
    datasets: [
      {
        data: dataForChart,
        color: (opacity = 255) => `rgba(14, 125, 124, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [legend], // optional
  };
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View
      style={{
        padding: 0,
        marginTop: 10,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <LineChart
        data={dataChart}
        width={340}
        height={200}
        chartConfig={chartConfig}
        bezier
        yAxisSuffix="%"
        style={{
          borderRadius: 20,
          paddingRight: 60,
        }}
      />
    </View>
  );
};

export default ChartTasks;
