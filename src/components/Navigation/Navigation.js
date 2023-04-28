
const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn){
        return(
            <nav className="flex justify-end ph3">
                <p onClick={() => onRouteChange('signIn')}
                    className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        )
    }
    return(
        <nav className="flex justify-end ph3">
            <p onClick={() => onRouteChange('signIn')}
                className="f3 link dim black underline pa3 pointer">Sign In</p>
            <p onClick={() => onRouteChange('register')}
                className="f3 link dim black underline pa3 pointer">Register</p>
        </nav>
    )
}

export default Navigation