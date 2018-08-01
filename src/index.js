import React from 'react'
import ReactDOM from 'react-dom'
import {Routes} from './Routes/Routes'
import {Footer} from './components/Footer/Footer'
import './scss/style.scss'
import {
    BottomNavigation,
    Grid,
    Cell
} from 'react-md';
import firebase from 'firebase';


const config = {
    apiKey: 'AIzaSyCMCsGc-foyjeiknZt9Nw5Sh8NrC2azZUg',
    authDomain: 'tess-36c94.firebaseapp.com',
    databaseURL: 'https://tess-36c94.firebaseio.com',
    projectId: 'tess-36c94',
    storageBucket: 'tess-36c94.appspot.com',
    messagingSenderId: '1071246914359'

};

firebase.initializeApp(config);

class App extends React.Component {
    render() {
        return (
            <div className="grid-tess">
                <Routes/>
                <Footer/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, app)
module.hot.accept();