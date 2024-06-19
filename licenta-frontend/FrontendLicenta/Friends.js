import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';

export default function Friends({ navigation }) {
  const [friends, setFriends] = useState([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ]);
  const [newFriend, setNewFriend] = useState('');

  const addFriend = () => {
    setFriends([...friends, { id: (friends.length + 1).toString(), name: newFriend }]);
    setNewFriend('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', { friend: item })}>
      <View style={styles.friendCard}>
        <Text style={styles.friendName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new friend"
        value={newFriend}
        onChangeText={setNewFriend}
      />
      <Button title="Add Friend" onPress={addFriend} />
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
  friendCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  friendName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
  },
});
