import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, MapPin, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import './OrderTracking.css';

const OrderTracking = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Simulate progress
    const timer1 = setTimeout(() => setStep(2), 3000);
    const timer2 = setTimeout(() => setStep(3), 6000);
    const timer3 = setTimeout(() => setStep(4), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    }
  }, []);

  return (
    <div className="tracking-container">
      <div className="tracking-card">
        <h1 className="tracking-title">Order Status</h1>
        <p className="tracking-subtitle">Tracking Order #12345</p>

        <div className="tracking-timeline">
          {[
            { s: 1, label: 'Order Placed', icon: <Clock size={20} /> },
            { s: 2, label: 'Order Confirmed', icon: <CheckCircle size={20} /> },
            { s: 3, label: 'Out for Delivery', icon: <Package size={20} /> },
            { s: 4, label: 'Delivered', icon: <MapPin size={20} /> }
          ].map((item, index) => (
            <div key={item.s} className={`timeline-item ${step >= item.s ? 'active' : ''}`}>
              <div className="timeline-icon">
                {item.icon}
              </div>
              <div className="timeline-content">
                <h3>{item.label}</h3>
                {step >= item.s && <span className="status-check">✓</span>}
              </div>
              {index < 3 && <div className={`timeline-line ${step > item.s ? 'filled' : ''}`}></div>}
            </div>
          ))}
        </div>

        {step === 4 ? (
          <div className="tracking-footer">
            <h2 className="enjoy-meal">Enjoy your meal!</h2>
            <Link to="/" className="home-btn">Go To Home</Link>
          </div>
        ) : (
          <div className="tracking-animation">
            <div className="bike-animation">
              <span style={{ fontSize: '3rem' }}>🛵</span>
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
              {step === 1 ? 'Waiting for restaurant confirmation...' :
                step === 2 ? 'Chef is preparing your food...' :
                  'Rider is on the way!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
