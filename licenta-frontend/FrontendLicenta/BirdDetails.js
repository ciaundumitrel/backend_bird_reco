import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function BirdDetails({ route }) {
  const { bird } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bird.name}</Text>
      <Image source={{ uri: bird.imageUrl }} style={styles.image} />
      <Text style={styles.description}>{bird.description}</Text>
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
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});
