import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom'
import './asidenav.scss'
import listen from './icons/listen.svg';
import featured from './icons/featured.svg';
import tess from './icons/tess.png';
import browse from './icons/browse.svg';

export const AsideNav = (props) => {
    return (
        <div className="tsAside">
            <div className="tsAside-wrap">
                <div className="navWrap">
                    <div className="navbar-start">
                        <NavLink exact className={"navbar-item"} to='/'><div className="imgWrap"><img src={listen} alt=""/></div><span>Listen Now</span></NavLink>
                        <NavLink className={"navbar-item"} to='/browse'><div className="imgWrap"><img src={browse} alt=""/></div><span>Browse</span></NavLink>
                        <NavLink className={"navbar-item"} to='/featured'><div className="imgWrap"><img src={featured} alt=""/></div><span>Featured</span></NavLink>
                        <NavLink className={"navbar-item"} to='/tess-studio'><div className="imgWrap"><img src={tess} alt=""/></div><span>Tess Studios</span></NavLink>
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
