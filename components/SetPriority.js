import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../screens/styleScreens";

const SetPriority = ({ index, handlePriority, accordion }) => {
  const [value, setValue] = useState("!");

  const i = ["!", "!!", "!!!"];
  const [currentIndex, setCurrentIndex] = useState(index);
  const colors = ["#008DFF", "#19D619", "#FF1D0B"];
  // const colors = ["#008DFF", "#00EA71", "#FF1D0B"];
  const words = ["Low", "Medium", "High"];

  const handlePress = () => {
    const nextIndex = (currentIndex + 1) % i.length;
    setCurrentIndex(nextIndex);

    // console.log(`press`);
  };
  const currentColor = colors[currentIndex];
  const currentWord = words[currentIndex];

  useEffect(() => {
    setValue(i[currentIndex]);
    handlePriority(currentIndex);
  }, [currentIndex]);

  return (
    <>
      {accordion && (
        <TouchableOpacity
          style={[
            styles.priorityBtn,
            { backgroundColor: currentColor, marginLeft: 0 },
          ]}
          onPress={handlePress}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            {value}
          </Text>
        </TouchableOpacity>
      )}
      {!accordion && (
        <View style={styles.priorityContainer}>
          <Text style={styles.textSetPriority}>Set priority</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>{currentWord}</Text>
            <TouchableOpacity
              style={[styles.priorityBtn, { backgroundColor: currentColor }]}
              onPress={handlePress}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
                {value}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default SetPriority;
