import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [geoLocation, setGeoLocation] = useState({})

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates)
    } else {
      alert('Geolocation not supported in your browser')
    }
  }

  function getCoordinates(position) {
    console.log(position);
    // setGeoLocation({
    //   latitude: '',
    //   longitude: ''
    // })
  }

  return (
    <div className="App">
      <h1>Hello geo tag</h1>
      <button onClick={getLocation}>Tes tombol</button>
    </div>
  );
}

export default App;
