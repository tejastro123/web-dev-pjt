import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RestaurantCard = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{restaurant.rating} ★</Text>
          </View>
        </View>
        <Text style={styles.cuisine}>{restaurant.cuisine.join(', ')}</Text>
        <View style={styles.row}>
          <Text style={styles.address}>{restaurant.address}</Text>
          <Text style={styles.delivery}>{restaurant.deliveryTime} mins</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    backgroundColor: '#24963F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cuisine: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  address: {
    color: '#999',
    fontSize: 12,
  },
  delivery: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default RestaurantCard;
