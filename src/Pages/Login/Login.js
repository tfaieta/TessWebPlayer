import React from 'react'
import {Button} from 'antd';
import {LoginForm} from '../../components/LoginForm/LoginForm'
import {CreateAccountForm} from '../../components/CreateAccountForm/CreateAccountForm'
import tessLogoWhite from '../../images/tessLogoWhite.png'

export class Login extends React.Component {    

  constructor(props) {
    super(props);

    this.state = {
      switch: false
    }

    this.handleSwitch = this.handleSwitch.bind(this)
  }

  handleSwitch() {
    this.setState({switch: true})
  }

  render() {
    return (
        <div className="loginContent">
            <img 
            alt="logo"
            style={{height: 142.575, width: 126.575, marginBottom: 50}}
            src={tessLogoWhite}
            />
            {this.state.switch ?
              <CreateAccountForm/>
              :
              <LoginForm
                onClick={this.handleSwitch}
              />
            }
            <div className="footer">
            <p className="loveFooter">Made with ❤ in Gainesville, FL</p>
            </div>  
        </div>
          
    )
  }
}
