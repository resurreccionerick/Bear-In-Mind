import { StatusBar } from "expo-status-bar";
import LoadingScreen from "./components/loadingScreen";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteItem from "./components/NoteItem";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "./firebase/index";

export default function App() {
  const [title, setTitle] = useState("");
  const [noteItemList, setNoteItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // add state for loading screen


  const addNoteItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "noteitem"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getNoteItemList(); 
  };

  const getNoteItemList = async () => {
    const querySnapshot = await getDocs(collection(db, "noteitem"));
    const items = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      items.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setNoteItemList(items);
    setIsLoading(false); // set isLoading to false once data is fetched
  };

  const deleteAllNoteItems = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete all note items?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const querySnapshot = await getDocs(collection(db, "noteitem"));
            querySnapshot.docs.map((item) =>
              deleteDoc(doc(db, "noteitem", item.id))
            );
            getNoteItemList();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // //retrieve the data when the app open
  // useEffect(() => {
  //   getNoteItemList();
  // }, []);
  
  useEffect(() => {
    setTimeout(() => {
      getNoteItemList();
    }, 3500); // delay for 2 seconds
  }, []);

  if (isLoading) { // show the LoadingScreen component when isLoading is true
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* heading */}
        <Text style={styles.heading}>Note-Taking App</Text>

        {/* no of to-do list */}
        <Text style={styles.noOfItems}>{noteItemList.length}</Text>

        {/* delete all */}
        <Pressable style={styles.deleteBtn} onPress={deleteAllNoteItems}>
          <MaterialIcons name="delete-forever" size={30} color="black" />
        </Pressable>
      </View>

      {/*Flat list - show data*/}
      {noteItemList.length > 0 ? (
        <FlatList
          data={noteItemList}
          renderItem={({ item }) => (
            <NoteItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getNoteItemList={getNoteItemList}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator />
      )}

      {/* Text input */}
      <TextInput
        placeholder="Enter new..."
        style={styles.input}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
        onSubmitEditing={addNoteItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#1E2F97",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  heading: {
    fontSize: 25,
    fontWeight: "400",
    flex: 1,
    color: "white",
  },

  noOfItems: {
    fontSize: 30,
    fontWeight: 500,
    color: "yellow",
  },

  deleteBtn: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginLeft: 15,
  },

  input: {
    backgroundColor: "#ffd500",
    color:"black",
    padding: 10,
    fontSize: 20,
    width: "100%",
    padding:10,
    alignSelf: "center",
    marginTop: "auto",
  },
});
