import { Component } from 'react';

const registerFetchURL = 'https://facerecognitionserver-britojv.onrender.com/register';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            name:''
        }
    };
    onEmailChange = (event) =>{
        this.setState({email:event.target.value});
    };
    onPasswordChange = (event) =>{
        this.setState({password:event.target.value});
    };
    onNameChange = (event) =>{
        this.setState({name:event.target.value});
    };
    onSubmitRegister = () => {
        console.log(this.state);
        fetch(registerFetchURL,{
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
            })
        })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }
    render(){
        return(
            <article className="br2 ba dark-gray b--black-30 mv4 w-100 w-50-m w-25-l mw5 center shadow-5 bw1">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label 
                                className="db fw6 lh-copy f6" 
                                htmlFor="name">Name
                            </label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            onClick={this.onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register