import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesBg from 'particles-bg'
import FaceBoundries from './components/FaceBoundries/FaceBoundries'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import { Component } from 'react';

const initialState = {
  inputImage: '',
  imageURL: "",
  requestOptions: "",
  boxes: [],
  route: "signIn",
  isSignedIn: false,
  user: {
    id:"",
    name:"",
    email:"",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined
      }})
  }

  faceLocations = (data) =>{
    let image = document.getElementById("imageProvided");
    let imageWidth = Number(image.width);
    let imageHeight = Number(image.height);
    let filteredBoxes = data.filter(element => element.value>0.90);
    let allBoxes = filteredBoxes.map(element => element.region_info.bounding_box);
    let scaledBoxes = allBoxes.map(element =>{
      return{
        leftCol: element.left_col * imageWidth,
        topRow: element.top_row * imageHeight,
        rightCol: imageWidth - element.right_col * imageWidth,
        bottomRow: imageHeight - element.bottom_row * imageHeight
      }
    })
    this.setState({boxes: scaledBoxes});
  }

  onInputImageChance = (event) =>{
    this.setState({inputImage: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.inputImage});
    fetch('https://facerecognitionserver-britojv.onrender.com/imageurl',{
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.inputImage
          })
      }
    )
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response){
        fetch('https://facerecognitionserver-britojv.onrender.com/image',{
          method: "put",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.faceLocations(response)})
    .catch(error => console.log('error', error));
  }

  onRouteChange = (newRoute) =>{
    if (newRoute === 'home') {this.setState({isSignedIn: true})}
    else {this.setState(initialState)}
    this.setState({route: newRoute})
  }

  render(){
    const { isSignedIn, imageURL, boxes, route } = this.state
    return (    
      <div className="App">
        <ParticlesBg num={40} type="cobweb" bg={true} />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        {route === "signIn"
          ?<SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          :route === "register"
            ?<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            :<div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputImageChance={this.onInputImageChance} onButtonSubmit={this.onButtonSubmit}/>
              <FaceBoundries boxes={boxes} imageURL={imageURL}/>
            </div>
        }
      </div>
    );
  }
}

export default App;
