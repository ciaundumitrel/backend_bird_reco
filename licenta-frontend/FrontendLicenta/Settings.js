import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

export default function Settings({ navigation }) {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const saveSettings = () => {
    // Here you would typically send the data to a backend or store it in local storage
    alert('Settings saved!');
  };

  // Placeholder function for profile picture change
  const changeProfilePicture = () => {
    alert('Function to change profile picture would be implemented here.');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={changeProfilePicture} style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={{ uri: 'https://placeimg.com/140/140/any' }} // Placeholder image
        />
        <Text>Change Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email Address"
        keyboardType="email-address"
      />

      <Button title="Save Settings" onPress={saveSettings} />

      <Button title="Back to Profile" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ddd',
  },
  profilePicContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
});
