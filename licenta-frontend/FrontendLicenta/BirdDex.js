import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

const birdData = [
  { id: '1', name: 'Black-headed Gull', description: 'A small gull with a distinctive dark head in breeding plumage and a white body.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/198109587/medium.jpg', encountered: true },
  { id: '2', name: 'Common Buzzard', description: 'A medium-to-large bird of prey with broad wings and a variety of color morphs.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/192398523/medium.jpeg', encountered: true },
  { id: '3', name: 'Common Chaffinch', description: 'A small bird with a strong voice, known for its colorful plumage in males.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/151143058/medium.jpg', encountered: false },
  { id: '4', name: 'Eurasian Coot', description: 'A water bird with a distinctive white beak and forehead shield, mostly black body.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/123574818/medium.jpg', encountered: true },
  { id: '5', name: 'Eurasian Magpie', description: 'A striking black and white bird known for its intelligence and complex social behavior.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/103446096/medium.jpg', encountered: false },
  { id: '6', name: 'Grey Heron', description: 'A large wading bird with long legs and neck, grey plumage, and a powerful bill.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/97939450/medium.jpg', encountered: false },
  { id: '7', name: 'Hooded Crow', description: 'A member of the crow family with a grey body and black head, wings, and tail.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/114176979/medium.jpg', encountered: true },
  { id: '8', name: 'House Sparrow', description: 'A small bird with a stout body, known for its adaptability to urban environments.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/4608133/medium.jpg', encountered: false },
  { id: '9', name: 'Mallard', description: 'A common duck species with iridescent green head in males and mottled brown in females.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/95268822/medium.jpg', encountered: false },
  { id: '10', name: 'Rook', description: 'A social bird related to crows with a distinctive bare grey-white face and black plumage.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/62108568/medium.jpg', encountered: true },
  { id: '11', name: 'White Wagtail', description: 'A slender bird with a distinctive black and white plumage and constantly wagging tail.', imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/39786089/medium.jpg', encountered: false },
];

export default function BirdDex({ navigation }) {
  const [birds] = useState(birdData);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => item.encountered && navigation.navigate('BirdDetails', { bird: item })}
      disabled={!item.encountered}
    >
      <View style={styles.birdCard}>
        <Text style={styles.birdName}>{item.name}</Text>
        {item.encountered ? (
          <Image source={{ uri: item.imageUrl }} style={styles.birdImage} />
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
