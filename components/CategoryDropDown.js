import React, { useState, useEffect } from "react";
import styles from "../screens/styleScreens";
import { View, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CategoryDropDown = ({ handleChangeCategori, categori }) => {
  const [openDropSelect, setOpenDropSelect] = useState(false);
  const [valueCategori, setValueCategori] = useState(categori);
  const [items, setItems] = useState([]);
  const [categoriShow, setCategoriShow] = useState(true);
  // const [valueDropBtns, setValueDropBtns] = useState();

  useEffect(() => {
    getCategory();
  }, []);

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.removeItem("category");
  //     console.log(`AsyncStorage cleared after key: `);
  //     getCategory();
  //   } catch (error) {
  //     console.error("Error clearing AsyncStorage:", error);
  //   }
  // };

  const deleteCategory = async (labelToDelete) => {
    try {
      const existingItems = await AsyncStorage.getItem("category");
      if (existingItems !== null) {
        const parsedItems = JSON.parse(existingItems);
        const filteredItems = parsedItems.filter(
          (item) => item.label.toLowerCase() !== labelToDelete.toLowerCase()
        );
        await AsyncStorage.setItem("category", JSON.stringify(filteredItems));
        getCategory();
      }
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  const getCategory = async () => {
    try {
      const value = await AsyncStorage.getItem("category");
      if (value !== null) {
        const myArray = JSON.parse(value);
        setItems(myArray);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.log("Error loading category: ", error);
    }
  };
  // console.log(`items`, items);

  const storeCategori = async (categori) => {
    try {
      const existingCategori = items;
      const findCategori = existingCategori.some((categ) => {
        return categ.label.trim() === categori.trim();
      });

      if (!findCategori) {
        existingCategori.push({
          label: categori.charAt(0).toUpperCase() + categori.slice(1),
          value: categori,
        });
        await AsyncStorage.setItem(
          "category",
          JSON.stringify(existingCategori)
        );
        getCategory();
      }
    } catch (error) {
      console.log("Eroare la memorarea datei:", error);
    }
  };

  const handleAddCategori = () => {
    setCategoriShow(!categoriShow);
    if (valueCategori) {
      storeCategori(valueCategori);
      handleChangeCategori(valueCategori);
      setValueCategori("");
    }
  };
  const handleDeleteCategori = () => {
    setCategoriShow(!categoriShow);
    deleteCategory(valueCategori);
    setValueCategori("");
    // handleChangeCategori(valueCategori);
    // console.log(`Delete categori:`, items);
  };

  useEffect(() => {
    handleChangeCategori(valueCategori);
  }, [valueCategori]);

  return (
    <>
      {categoriShow ? (
        <>
          <View>
            <DropDownPicker
              open={openDropSelect}
              value={valueCategori}
              items={items}
              setOpen={setOpenDropSelect}
              setValue={setValueCategori}
              setItems={setItems}
              maxHeight={200}
              autoScroll={true}
              style={styles.dropDown}
              zIndex={1000}
              placeholder="Select an category"
            />
          </View>
          <TouchableOpacity
            onPress={() => setCategoriShow(!categoriShow)}
            style={{ ...styles.iconCategorie }}
          >
            <Ionicons name="add-sharp" size={25} color={"#002F00"} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={{ ...styles.input, width: 180, margin: 0 }}
            onChangeText={setValueCategori}
            placeholder="Category"
            value={valueCategori}
            autoCapitalize="sentences"
            inputMode="text"
          />
          <TouchableOpacity
            onPress={handleAddCategori}
            style={styles.iconCategorie}
          >
            <Ionicons name="checkmark-sharp" size={30} color={"green"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteCategori}
            style={styles.iconCategorie}
          >
            <Ionicons name="remove-sharp" size={30} color={"red"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCategoriShow(!categoriShow)}
            style={styles.iconCategorie}
          >
            <Ionicons name="close-sharp" size={30} />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};
export default CategoryDropDown;
