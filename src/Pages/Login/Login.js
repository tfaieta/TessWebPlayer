import React from 'react'
import {LoginForm} from '../../components/LoginForm/LoginForm'
import {CreateAccountForm} from '../../components/CreateAccountForm/CreateAccountForm'
import tessLogoWhite from '../../images/tessLogoWhite.png'

export class Login extends React.Component {    

  constructor(props) {
    super(props);

    this.state = {
      switch: true
    }
  }

  render() {
    if (this.state.switch) {
      return(
        <div className="loginContent">
        <img 
        alt="logo"
        style={{height: 142.575, width: 126.575, marginBottom: 50}}
        src={tessLogoWhite} 
        />
        <CreateAccountForm/>
      </div>
      )
    }
    else {
      return (
        <div className="loginContent">
            <img 
            alt="logo"
            style={{height: 142.575, width: 126.575, marginBottom: 50}}
            src={tessLogoWhite} 
            />
            <LoginForm/> 
        </div>    
      )
    }
  }
}
