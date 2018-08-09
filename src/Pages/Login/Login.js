import React from 'react'
import {LoginForm} from '../../components/LoginForm/LoginForm'

export class Login extends React.Component {
    
      render() {
        return (
          <div className="tcontent">
            <div className="tsscrollcontent">
                <div className="container">
                    <div className="trow-header">
                        <LoginForm/>
                    </div>
                </div>
            </div>
          </div>
        );
      }
}
