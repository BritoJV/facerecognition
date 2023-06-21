import './FaceBoundries.css'

const FaceBoundries = ({boxes, imageURL}) => {

    let boundriesBoxes = boxes.map((box, index) =>{
        let aux = {top: box.topRow, 
            bottom: box.bottomRow, 
            left: box.leftCol, 
            right: box.rightCol}
        return(
            <div key={index} className="bounding-box" style={aux}>
            </div>
        )
    })  
    return(
        <div  className="flex justify-center">
            <div className="ma2 absolute">
                <img id={"imageProvided"} src={imageURL} alt="" width={"500 px"} height={"auto"}></img>
                <div>{boundriesBoxes}</div>
            </div>
        </div>
    )
}

export default FaceBoundries