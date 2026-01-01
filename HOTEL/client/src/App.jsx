import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const RestaurantDetails = React.lazy(() => import('./pages/RestaurantDetails'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Profile = React.lazy(() => import('./pages/Profile'));
const OrderTracking = React.lazy(() => import('./pages/OrderTracking'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
            </Routes>
          </React.Suspense>
        </PageTransition>
      </AnimatePresence>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <Toaster position="top-right" />
              <Navbar />
              <AnimatedRoutes />
            </div>
          </Router>
        </CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
