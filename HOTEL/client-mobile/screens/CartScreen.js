import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = ({ navigation }) => {
  const { cart, restaurant, removeFromCart, cartTotal, clearCart } = useCart();

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        user: "Guest User", // Replace with real user ID
        restaurant: restaurant._id,
        items: cart.map(item => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: cartTotal
      };

      await createOrder(orderData);

      Alert.alert('Order Placed!', `Your order of ₹${cartTotal} from ${restaurant.name} has been placed.`, [
        {
          text: 'OK', onPress: () => {
            clearCart();
            navigation.navigate('Home');
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to place order.');
      console.error(error);
    }
  };

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <Text style={styles.restaurantName}>from {restaurant?.name}</Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <View style={[styles.vegIcon, { borderColor: item.isVeg ? 'green' : 'red' }]}>
                <View style={[styles.vegDot, { backgroundColor: item.isVeg ? 'green' : 'red' }]} />
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalAmount}>₹{cartTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#888' },
  header: { padding: 20, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  restaurantName: { fontSize: 14, color: '#666', marginTop: 5 },
  list: { padding: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  itemInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  vegIcon: { width: 12, height: 12, borderWidth: 1, marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  vegDot: { width: 6, height: 6, borderRadius: 3 },
  itemName: { fontSize: 16, marginRight: 10 },
  itemPrice: { fontSize: 14, fontWeight: 'bold' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
  qtyBtn: { paddingHorizontal: 10, paddingVertical: 5 },
  qtyText: { fontSize: 16, color: '#E23744', fontWeight: 'bold' },
  quantity: { paddingHorizontal: 10, fontSize: 16 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#E23744' },
  placeOrderBtn: { backgroundColor: '#E23744', padding: 15, borderRadius: 10, alignItems: 'center' },
  placeOrderText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default CartScreen;
