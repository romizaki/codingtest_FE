import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [geoLocation, setGeoLocation] = useState({})
  const [playing, setPlaying] = useState(false);

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
    console.log(geoLocation);
  }


  const HEIGHT = 500;
  const WIDTH = 500;

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName('app__videoFeed')[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    setPlaying(false);
    let video = document.getElementsByClassName('app__videoFeed')[0];
    video.srcObject.getTracks()[0].stop();
  };

  return (
    <div className="App">
      <div className="app__container">
        <video
          height={HEIGHT}
          width={WIDTH}
          muted
          autoPlay
          className="app__videoFeed"
        ></video>
      </div>
      <div className="app__input">
        {playing ? (
          <button onClick={stopVideo}>Stop</button>
        ) : (
            <button onClick={startVideo}>Start</button>
          )}
      </div>
      <h1>Hello geo tag</h1>
      <button onClick={getLocation}>Tes tombol</button>
    </div>
  );
}

export default App;
