import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Recorder from './recorder';

export default function Recording() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a new bird</Text>
      <Recorder />
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
