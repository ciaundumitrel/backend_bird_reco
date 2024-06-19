import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {useAuth} from "./AuthContext";


const SERVER = 'http://192.168.100.11:8000/api/birds/';
export default function BirdDex({ navigation }) {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, login, logout, authToken } = useAuth();

  useEffect(() => {
    fetch(SERVER,
        {
        method: 'GET',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json'
        }})
      .then(response => response.json())
      .then(data => {
        setBirds(data);
        setLoading(false);
        console.log(1)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => item.encountered && navigation.navigate('BirdDetails', { bird: item })}
      disabled={!item.encountered}
    >
      <View style={styles.birdCard}>
        <Text style={styles.birdName}>{item.common_name}</Text>
        {item.encountered ? (
          <Image source={{ uri: item.image }} style={styles.birdImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>???</Text>
          </View>
        )}
        <Text style={styles.birdDescription}>{item.encountered ? item.description : 'Unknown bird'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={birds}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  birdCard: {
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
  birdName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  birdDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  birdImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  placeholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 24,
    color: '#999',
  },
});
