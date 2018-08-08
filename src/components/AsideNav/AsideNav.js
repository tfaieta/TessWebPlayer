import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom'
import './asidenav.scss'
import listen from './icons/listen.svg';
import home from './icons/home.svg';
import tess from './icons/tess.png';
import browse from './icons/browse.svg';

export const AsideNav = (props) => {
    return (
        <div className="tsAside">
            <div className="tsAside-wrap">
                <div className="navWrap">
                    <div className="navbar-start">
                    
                        {/* Todo: change all the icons and figure out what is wrong with .svg files*/}
                        <NavLink exact className={"navbar-item"} to='/'><div className="imgWrap"><img src={home} alt=""/></div><span>Home</span></NavLink>
                        <NavLink className={"navbar-item"} to='/browse'><div className="imgWrap"><img src={browse} alt=""/></div><span>Browse</span></NavLink>
                        <NavLink className={"navbar-item"} to='/featured'><div className="imgWrap"><img src={listen} alt=""/></div><span>Library</span></NavLink>
                        <NavLink className={"navbar-item"} to='/tess-studio'><div className="imgWrap"><img src={tess} alt=""/></div><span>Tess Media</span></NavLink>
                    </div>
                </div>

                <div className="questionWrap">
                    <Link to="/upload">Don't see your favorite podcast?</Link>
                </div>
            </div>

        </div>
    )
}
AsideNav.propTypes = {}
