import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const CheckboxListInput = ({
  handleTaskList,
  taskList,
  handleProgressTask,
  disable,
  color,
  colorDisable,
  listsScreen,
}) => {
  // console.log(`heckboxListInput:`, taskList);
  const [items, setItems] = useState(taskList);
  // const [textInputValue, setTextInputValue] = useState("");

  const countChecked = items.filter((item) => item.checked === true).length;
  // console.log("chboxAccordion111:", items);
  useEffect(() => {
    // console.log("chboxAccordion:", items);
    handleTaskList(items);

    handleProgressTask(countChecked / items.length);
  }, [items, countChecked]);

  // const handleAddItem = () => {
  //   if (textInputValue.trim() !== "") {
  //     setItems([...items, { label: textInputValue, checked: false }]);
  //     setTextInputValue("");
  //   }
  // };

  const handleToggleItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  const handleEditItemLabel = (index, text) => {
    const updatedItems = [...items];
    updatedItems[index].label = text;
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    // console.log(`index`, index);
    const newArray = [...items];

    // Use splice to remove the object at the specified index
    newArray.splice(index, 1);

    setItems(newArray);
  };
  // console.log(`11111111111`, new Date().toDateString());
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          marginBottom: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!listsScreen ? (
            <CheckBox
              checked={item.checked}
              onPress={() => handleToggleItem(index)}
              checkedColor={disable ? colorDisable : color}
              containerStyle={{ margin: 0, padding: 2 }}
              disabled={disable}
              uncheckedColor={disable ? "#D9DAFF" : colorDisable}
            />
          ) : (
            <View style={{ marginLeft: 15 }}></View>
          )}

          <TextInput
            value={item.label}
            onChangeText={(text) => handleEditItemLabel(index, text)}
          />
        </View>

        <TouchableOpacity onPress={() => handleDeleteItem(index)}>
          <Ionicons name="remove-sharp" size={25} color={"red"} />
        </TouchableOpacity>
      </View>
    );
  };

  // const scrollViewRef = useRef(null);

  // useEffect(() => {
  //   if (scrollViewRef.current)
  //     scrollViewRef.current.scrollToEnd({ animated: true });
  // }, [textInputValue]);

  return (
    <View style={{ maxHeight: 100 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString() + item}
          scrollEnabled={true}
        />
      </ScrollView>
    </View>
  );
};

export default CheckboxListInput;
