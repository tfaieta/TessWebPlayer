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
import {History} from "../Pages/History/History";
import {Favorites} from "../Pages/Favorites/Favorites";
import {ProfileView} from "../Pages/ProfileView/ProfileView";
import {Podcasts} from "../Pages/Podcasts/Podcasts";
import {Playlists} from "../Pages/Playlists/Playlists";
import {Playlist} from "../Pages/Playlists/Playlist";
import {AddToPlaylist} from "../Pages/Playlists/AddToPlaylist";
import {Search} from "../Pages/Search/Search";

export class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Listen}/>
                    <Route path='/browse' component={Browse}/>
                    <Route path='/library' component={Featured}/>
                    <Route path='/learn' component={Learn}/>
                    <Route path='/tess-studio' component={TessStudio}/>
                    <Route path='/upload' component={Upload}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/history' component={History}/>
                    <Route path='/favorites' component={Favorites}/>
                    <Route path='/podcasts' component={Podcasts}/>
                    <Route path='/playlists' component={Playlists}/>
                    <Route path='/playlist' component={Playlist}/>
                    <Route path='/addtoplaylist' component={AddToPlaylist}/>
                    <Route path='/view' component={ProfileView}/>
                    <Route path='/search' component={Search}/>
                    <Route  component={Notfound}/>
                </Switch>
            </Router>

        )
    }
}	