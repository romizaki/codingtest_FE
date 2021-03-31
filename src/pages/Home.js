import GeoLocation from '../components/GeoLocation'
import Camera from '../components/Camera'
import Form from '../components/Form'

function Home() {
  return (
    <div className="container">
      <Camera />
      <GeoLocation />
      <Form />
    </div>
  );
}

export default Home;
