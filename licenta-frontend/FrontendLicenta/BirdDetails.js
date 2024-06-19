import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function BirdDetails({ route }) {
  const { bird } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bird.common_name}</Text>
      <Text style={styles.subtitle}>{bird.scientific_name}</Text>
      <Image source={{ uri: bird.image }} style={styles.image} />
      <Text style={styles.description}>{bird.description}</Text>
      <Text style={styles.info}><Text style={styles.infoLabel}>Habitat:</Text> {bird.habitat}</Text>
      <Text style={styles.info}><Text style={styles.infoLabel}>Population Status:</Text> {bird.population_status}</Text>
      <Text style={styles.info}><Text style={styles.infoLabel}>Encountered:</Text> {bird.encountered ? 'Yes' : 'No'}</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
});
