import React from 'react'
import {LoginForm} from '../../components/LoginForm/LoginForm'
import tessLogoWhite from '../../images/tessLogoWhite.png'

export class Login extends React.Component {
    
      render() {
        return (
        <div className="loginContent">
            <img 
            alt="logo"
            style={{height: 142.575, width: 126.575, marginBottom: 50}}
            src={tessLogoWhite} 
            />
            <LoginForm/>    
        </div>
        );
      }
}
