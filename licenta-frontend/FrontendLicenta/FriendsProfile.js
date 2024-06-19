import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FriendProfile({ route }) {
  const { friend } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{friend.name}'s Profile</Text>
      {/* Add more friend details here */}
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
});
