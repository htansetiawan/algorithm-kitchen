import React, { useEffect } from 'react';
import AlgorithmKitchen from './components/AlgorithmKitchen';
import { analytics } from './firebase';

function App() {
  useEffect(() => {
    // Firebase Analytics is automatically initialized in firebase.js
    // This will only load in production
    if (process.env.NODE_ENV === 'production' && analytics) {
      console.log('Firebase Analytics initialized');
    }
  }, []);

  return (
    <div className="App">
      <AlgorithmKitchen />
    </div>
  );
}

export default App;
