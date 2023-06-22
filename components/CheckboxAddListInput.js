import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CheckboxAddListInput = ({ handleTaskList, taskList }) => {
  const [items, setItems] = useState(taskList);
  const [textInputValue, setTextInputValue] = useState("");

  useEffect(() => {
    handleTaskList(items);
  }, [items]);

  const handleAddItem = () => {
    if (textInputValue.trim() !== "") {
      setItems([...items, { label: textInputValue, checked: false }]);
      setTextInputValue("");
    }
  };

  const handleEditItemLabel = (index, text) => {
    const updatedItems = [...items];
    updatedItems[index].label = text;
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const newArray = [...items];
    newArray.splice(index, 1);
    setItems(newArray);
  };

  const renderItem = ({ item, index }) => (
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
          marginLeft: 10,
        }}
      >
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

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current)
      scrollViewRef.current.scrollToEnd({ animated: true });
  }, [textInputValue]);

  return (
    <>
      <View style={{ maxHeight: 100 }}>
        <FlatList
          ref={scrollViewRef}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#E5FEFF",
          marginHorizontal: 10,
          marginBottom: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          style={{ paddingLeft: 10 }}
          value={textInputValue}
          onChangeText={setTextInputValue}
          placeholder="Enter an item in list"
          onSubmitEditing={handleAddItem}
          blurOnSubmit={false}
        />
      </View>
    </>
  );
};

export default CheckboxAddListInput;
