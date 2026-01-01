import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const { addToCart, cartCount, restaurant: cartRestaurant } = useCart();

  const handleAddToCart = (item) => {
    if (cartRestaurant && cartRestaurant._id !== restaurant._id) {
      Alert.alert(
        "Start new order?",
        "You have items from another restaurant. Adding this will clear your current cart.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => addToCart(item, restaurant) }
        ]
      );
    } else {
      addToCart(item, restaurant);
    }
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuInfo}>
        <View style={[styles.vegIcon, { borderColor: item.isVeg ? 'green' : 'red' }]}>
          <View style={[styles.vegDot, { backgroundColor: item.isVeg ? 'green' : 'red' }]} />
        </View>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>₹{item.price}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
      <View style={styles.menuRight}>
        {item.image && <Image source={{ uri: item.image }} style={styles.menuImage} />}
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine.join(', ')}</Text>
          <Text style={styles.address}>{restaurant.address}</Text>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingText}>{restaurant.rating} ★</Text>
          </View>
        </View>

        <Text style={styles.menuTitle}>Menu</Text>
        <FlatList
          data={restaurant.menu}
          keyExtractor={(item) => item._id}
          renderItem={renderMenuItem}
          scrollEnabled={false} // Since it's inside ScrollView
          contentContainerStyle={styles.menuList}
        />
      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity style={styles.viewCartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.viewCartText}>View Cart ({cartCount} items)</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 200 },
  headerInfo: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 24, fontWeight: 'bold' },
  cuisine: { fontSize: 14, color: '#666', marginTop: 5 },
  address: { fontSize: 14, color: '#999', marginTop: 2 },
  ratingBox: {
    position: 'absolute', right: 15, top: 15,
    backgroundColor: '#24963F', padding: 5, borderRadius: 5
  },
  ratingText: { color: '#fff', fontWeight: 'bold' },
  menuTitle: { fontSize: 20, fontWeight: 'bold', padding: 15, backgroundColor: '#f9f9f9' },
  menuList: { padding: 15 },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 20
  },
  menuInfo: { flex: 1, paddingRight: 10 },
  menuName: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  menuPrice: { fontSize: 14, marginTop: 5 },
  menuDescription: { fontSize: 12, color: '#888', marginTop: 5 },
  menuRight: { alignItems: 'center' },
  menuImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  addButton: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E23744',
    paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5, marginTop: -15, backgroundColor: '#fff'
  },
  addButtonText: { color: '#E23744', fontWeight: 'bold' },
  vegIcon: { width: 15, height: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  vegDot: { width: 8, height: 8, borderRadius: 4 },
  viewCartButton: {
    position: 'absolute', bottom: 20, left: 20, right: 20,
    backgroundColor: '#E23744', padding: 15, borderRadius: 10, alignItems: 'center', elevation: 5
  },
  viewCartText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});

export default RestaurantDetailScreen;
