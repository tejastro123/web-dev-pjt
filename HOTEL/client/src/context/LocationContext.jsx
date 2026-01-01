import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [city, setCity] = useState("Mumbai"); // Default city
  const [coordinates, setCoordinates] = useState({ lat: 19.0760, lng: 72.8777 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        // In a real app, we would reverse geocode here to get the City Name
        // For mock, we'll just set it to "Detected Location" or keep Mumbai if we prefer proper data
        setCity("Current Location");
        setLoading(false);
      },
      (err) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  return (
    <LocationContext.Provider value={{ city, setCity, coordinates, detectLocation, loading, error }}>
      {children}
    </LocationContext.Provider>
  );
};
