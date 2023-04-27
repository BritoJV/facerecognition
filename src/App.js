import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesBg from 'particles-bg'
import ClarifaiRequestOptions from './components/ClarifaiRequestOptions/ClarifaiRequestOptions'
import FaceBoundries from './components/FaceBoundries/FaceBoundries'
import { Component } from 'react';

// console.log(ClarifaiRequestOptions("https://samples.clarifai.com/metro-north.jpg"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputImage: '',
      imageURL: "",
      requestOptions: "",
      // box: {},
      boxes: []
    }
  }

  faceLocations = (data) =>{
    let image = document.getElementById("imageProvided");
    let imageWidth = Number(image.width);
    let imageHeight = Number(image.height);
    let clarifaiData = data.outputs[0].data.regions;
    // console.log(clarifaiData);
    // let boundingBox = clarifaiData[0].region_info.bounding_box;
    let filteredBoxes = clarifaiData.filter(element => element.value>0.90);
    // console.log(filteredBoxes);
    let allBoxes = filteredBoxes.map(element => element.region_info.bounding_box);
    let scaledBoxes = allBoxes.map(element =>{
      return{
        leftCol: element.left_col * imageWidth,
        topRow: element.top_row * imageHeight,
        rightCol: imageWidth - element.right_col * imageWidth,
        bottomRow: imageHeight - element.bottom_row * imageHeight
      }
    })
    console.log(allBoxes);
    console.log(scaledBoxes);
    this.setState({boxes: scaledBoxes});
    // return{
    //   leftCol: boundingBox.left_col * imageWidth,
    //   topRow: boundingBox.top_row * imageHeight,
    //   rightCol: imageWidth - boundingBox.right_col * imageWidth,
    //   bottomRow: imageHeight - boundingBox.bottom_row * imageHeight
    // }
  }

  // displayBoundrieBoxes = (box) => {
  //   this.setState({box: box});    
  //   // this.setState({boxes: allBoxes});
  // }

  onInputImageChance = (event) =>{
    this.setState({inputImage: event.target.value});
    this.setState({requestOptions: ClarifaiRequestOptions(event.target.value)});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.inputImage});
    console.log(this.state.requestOptions);
    fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, this.state.requestOptions)
    .then(response => response.json())
    .then(response => this.faceLocations(response))
    .catch(error => console.log('error', error));
  }

  render(){
    return (    
      <div className="App">
        <ParticlesBg num={40} type="cobweb" bg={true} />
        <Navigation />
        {/* <div className='flex'> */}
          <Logo />
          <Rank />
          <ImageLinkForm onInputImageChance={this.onInputImageChance} onButtonSubmit={this.onButtonSubmit}/>
        {/* </div> */}
          <FaceBoundries boxes={this.state.boxes} imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
