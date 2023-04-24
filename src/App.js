import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesBg from 'particles-bg'


function App() {
  return (
    <div className="App">
      <ParticlesBg num={40} type="cobweb" bg={true} />
      <Navigation />
      {/* <div className='flex'> */}
        <Logo />
        <Rank />
        <ImageLinkForm />
      {/* </div> */}
          {/*<FaceBoundries /> */}
    </div>
  );
}

export default App;
