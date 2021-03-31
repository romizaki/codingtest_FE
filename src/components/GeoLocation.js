import { useState } from 'react';

function GeoLocation() {
  const [geoLocation, setGeoLocation] = useState({})

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates)
    } else {
      alert('Geolocation not supported in your browser')
    }
  }

  function getCoordinates(position) {
    setGeoLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    alert(`Your location is ${geoLocation.latitude}, ${geoLocation.longitude}`)
    console.log(geoLocation);
  }

  return (
    <div>
      <h1>Hello geo tag</h1>
        <button onClick={getLocation}>Tes tombol</button>
    </div>
  )
}

export default GeoLocation