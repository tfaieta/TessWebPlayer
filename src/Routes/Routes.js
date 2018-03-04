import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Listen} from '../Pages/Listen/Listen'
import {Browse} from '../Pages/Browse/Browse'
import {Featured} from '../Pages/Featured/Featured'
import {Learn} from '../Pages/Learn/Learn'
import {TessStudio} from '../Pages/TessStudio/TessStudio'
import {Upload} from '../Pages/Upload/Upload'
import {Profile} from '../Pages/Profile/Profile'
import {Notfound} from '../Pages/Notfound/Notfound'


export class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Listen}/>
                    <Route path='/browse' component={Browse}/>
                    <Route path='/featured' component={Featured}/>
                    <Route path='/learn' component={Learn}/>
                    <Route path='/tess-studio' component={TessStudio}/>
                    <Route path='/upload' component={Upload}/>
                    <Route path='/profile' component={Profile}/>
                    <Route  component={Notfound}/>
                </Switch>
            </Router>

        )
    }
}	