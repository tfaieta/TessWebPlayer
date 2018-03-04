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