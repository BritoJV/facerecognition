import './FaceBoundries.css'

const FaceBoundries = ({boxes, imageURL}) => {

    let boundriesBoxes = boxes.map((box, index) =>{
        console.log (box);
        let aux = {top: box.topRow, 
            bottom: box.bottomRow, 
            left: box.leftCol, 
            right: box.rightCol}
        return(
            <div key={index} className="bounding-box" style={aux}>
            </div>
        )
    })
    console.log (boundriesBoxes);      
    return(
        <div  className="flex justify-center ma2 absolute">
            <img id={"imageProvided"} src={imageURL} alt="" width={"500 px"} height={"auto"}></img>
            <div>{boundriesBoxes}</div>
            {/* <div className="bounding-box" style={{  top: box.topRow, 
                                                    bottom: box.bottomRow, 
                                                    left: box.leftCol, 
                                                    right: box.rightCol}}></div> */}
        </div>
    )
}

export default FaceBoundries