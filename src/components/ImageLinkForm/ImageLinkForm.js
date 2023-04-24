import './ImageLinkForm.css'

const Navigation = () => {
    return(
        <div> 
            <p className="f3">This app will find faces in your picture</p>
            <div className="flex justify-center">
                <div className="flex justify-center pa3 br3 shadow-5 form">
                    <input type='text' className="f3 pa2 w-70 center br2"></input>
                    <button className="w-30 f3 pa2 link br-pill white bg-dark-blue ml2 grow">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default Navigation