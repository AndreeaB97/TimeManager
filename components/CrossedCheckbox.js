import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { CheckBox } from "react-native-elements";

const CrossedCheckbox = ({
  label,
  checked,
  onPress,
  disable,
  color,
  listsScreen,
}) => {
  // const [disable, setDisable] = useState(false);

  // useEffect(() => {
  //   handleDisabled();
  // }, [currendDate]);

  // const handleDisabled = () => {
  //   const date = new Date();
  //   if (new Date(currendDate).getDate() === date.getDate()) {
  //     setDisable(false);
  //   } else {
  //     setDisable(true);
  //   }
  // };

  const handlePress = () => {
    // setIsCrossed(!isCrossed);
    // onPress(!isCrossed);
    onPress(!checked);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: 220,
        // backgroundColor: "red",
      }}
    >
      {!listsScreen ? (
        <CheckBox
          checked={checked}
          onPress={handlePress}
          checkedColor={color}
          uncheckedColor={disable ? "grey" : color}
          containerStyle={{
            marginLeft: 0,
            marginRight: 0,
            marginVertical: -5,
          }}
          disabled={disable}
        />
      ) : (
        <View style={{ marginLeft: 15 }}></View>
      )}
      <Text
        // numberOfLines={1}
        style={{
          textDecorationLine: checked ? "line-through" : "none",
          textDecorationStyle: checked ? "double" : null,
          marginLeft: -5,
          fontWeight: checked ? "400" : "bold",
          fontSize: 16,
          fontFamily: "monospace",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default CrossedCheckbox;
