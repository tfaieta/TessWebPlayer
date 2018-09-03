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

    this.handleCreate = this.handleCreate.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  handleCreate() {
    this.setState({switch: true})
  }

  handleBack() {
    this.setState({switch: false})
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
              <CreateAccountForm
                onClick={this.handleBack}
              />
              :
              <LoginForm
                onClick={this.handleCreate}
              />
            }
            <div className="footer">
              <p className="loveFooter">Made with ❤ in Gainesville, FL</p>
            </div>  
        </div>
          
    )
  }
}
