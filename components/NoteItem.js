import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { db, doc, updateDoc, deleteDoc } from "../firebase/index";
//note item object
/*
    1.id,
    2.title,
    3.isChecked
*/
const NoteItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  // state to track the timeout id
  const [timeoutId, setTimeoutId] = useState(null);

  //update the existing title
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    const updateIsChecked = async () => {
      const update = doc(db, "noteitem", props.id);
      await updateDoc(update, {
        isChecked: isChecked, // update the isChecked field with a boolean value
      });
    };

    updateIsChecked();
  }, [isChecked]);

  useEffect(() => {
    const updateTitle = async () => {
      const update = doc(db, "noteitem", props.id);
      await updateDoc(update, {
        title: title, // update the title field with the new value
      });
    };

    updateTitle();
  }, [title]);

  const handleLongPress = () => {
    setIsChecked(false); // reset the isChecked state to false on long press
    clearTimeout(timeoutId); // clear any active timeouts
    setTimeoutId(null);
  };

  const deleteItem = async () => {
    await deleteDoc(doc(db, "noteitem", props.id));
    props.getNoteItemList();
  };

  return (
    <View style={styles.container}>
      {/*Shopping icon*/}
      <Pressable
        onPress={() => {
          if (!isChecked) setIsChecked(true);
        }}
        onLongPress={handleLongPress}
      >
        {isChecked ? (
          <AntDesign
            name="checkcircleo"
            size={24}
            color="black"
            style={styles.isCheckedBg}
          />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="black" />
        )}
      </Pressable>

      {/*todo text*/}
      {/* <Text style={styles.titles}>{props.title}</Text> */}
      {/*todo text*/}
      <TextInput style={styles.titles} value={title} onChangeText={setTitle}
       />

      {/*delete btn*/}
      <Pressable onPress={deleteItem}>
        <AntDesign name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#dcdcdc",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
  },

  titles: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500",
  },

  isCheckedBg: {
    backgroundColor: "green",
    borderRadius: 15,
    color: "yellow",
  },
});
