import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.scss'
import { store } from "../../store";
import {setAuth, setUsername, setBio, setProfileImage} from "../../actions/index";
import firebase from 'firebase';

const FormItem = Form.Item;

export class LoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        store.dispatch(setAuth('', '', false, '', ''));
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);

            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(user => {
                    // login success
                     let currentUser = {uid: user.user.uid}
                     store.dispatch(setAuth('', values.email, true, currentUser.uid, ''));
                     firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").once("value", function(snap) {
                         if(snap.val()){
                             store.dispatch(setUsername(snap.val().username));
                         }
                         else {
                             store.dispatch(setUsername("..."));
                         }
                     });
                     firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").once("value", function(snap) {
                         if(snap.val()){
                             store.dispatch(setBio(snap.val().bio));
                         }
                         else {
                             store.dispatch(setBio("Tell others about yourself"));
                         }
                     });
                     firebase.database().ref(`users/${currentUser.uid}/profileImage`).once("value", function (snapshot) {
                         if(snapshot.val()){
                             store.dispatch(setProfileImage(snapshot.val().profileImage));
                         }
                         else{
                             const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
                             storageRef.getDownloadURL()
                                 .then(function(url) {
                                     store.dispatch(setProfileImage(url));
                                 }).catch(function(error) {
                                 //
                             });
                         }
                     });
                })
                .catch((error) => {
                    // login failed, need error message here
                    console.log("Login Failed!");
                    console.log(error);
                    store.dispatch(setAuth('', '', false, '', 'Incorrect email or password'));
                });
          }
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;

        return (
          <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
            <FormItem>
               <a className="login-form-forgot" href="">{store.getState().auth.errorMessage}</a>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox className="login-form-forgot">Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <Button className="login-form-button" onClick={this.props.onClick}>
                Sign Up
              </Button>
            </FormItem>
          </Form>
        );
      }
}

LoginForm = Form.create()(LoginForm);