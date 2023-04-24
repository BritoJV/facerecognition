import Tilt from 'react-parallax-tilt';
import './Logo.css';
import face from './face2.png'

const Logo = () => {
    return(
        <Tilt className='ma4 br3 shadow-2 Tilt ba flex content-center'>
            <div className='flex justify-center ma3'>
                {/* <p className="f3 link dim black underline pa3 pointer">test</p> */}
                <img alt='' src={face}/>
            </div>
        </Tilt>
    )
}

export default Logo