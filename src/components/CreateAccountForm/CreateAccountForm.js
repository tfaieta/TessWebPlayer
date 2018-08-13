import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.scss'
import firebase from 'firebase';
import { store } from "../../store";
import {setAuth, setUsername, setBio, setProfileImage} from "../../actions/index";

const FormItem = Form.Item;

export class CreateAccountForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        store.dispatch(setAuth('', '', false, '', ''));
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);

            let username = values.username;
              firebase.database().ref(`usernames/`).child(username.toLowerCase()).once("value", function (snapshot) {
                  if (snapshot.val()) {
                      console.log(snapshot.val().username + " is taken");
                      store.dispatch(setAuth('', '', false, '', 'Username is taken'));
                  }
                  else {
                      firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                          .then(user => {
                              // create success
                              let currentUser = {uid: user.user.uid};
                              store.dispatch(setAuth('', values.email, true, currentUser.uid, ''));
                              firebase.database().ref(`usernames`).child(username.toLowerCase()).update({username: username.toLowerCase()});

                              firebase.database().ref(`users/${currentUser.uid}`).child('/username')
                                  .update({ username: username });

                              // W/O this the ActivityIndicator won't show on CreateAccount.js
                              firebase.auth().signInWithEmailAndPassword(values.email, values.password);

                              firebase.auth().currentUser.sendEmailVerification().then(function() {
                                  // Email sent.
                                  console.log("Verifcation Email Sent: Success")
                              }).catch(function(error) {
                                  // An error happened.
                                  console.log("Verifcation Email Sent: Error")
                              });
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
                              // failed to create account
                              console.log("Create Account Failed");
                              console.log(error);
                              store.dispatch(setAuth('', '', false, '', 'Invalid credentials'));
                          });
                  }
              }.bind(this)).catch(() => {
                  console.log("error when creating account")
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
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input a desired username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign Up
              </Button>
              <Button className="login-form-button" onClick={this.props.onClick}>
                Back
              </Button>
            </FormItem>
          </Form>
        );
      }
}

CreateAccountForm = Form.create()(CreateAccountForm);