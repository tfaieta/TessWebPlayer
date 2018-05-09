import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {BrowserRouter as Router, NavLink, Switch} from 'react-router-dom'

export const MainMenu = (props) => {
    return (
        <div className="tsMainMenu">
            <nav className="navbar">
                <div id="navMenuExample" className="navbar-menu">
                    <div className="navbar-start">
                        <NavLink exact className={"navbar-item"} to='/'>Listen</NavLink>
                        <NavLink  className={"navbar-item"}
                                 to='/upload'>Upload</NavLink>
                        <NavLink  className={"navbar-item"}
                                 to='/learn'>Learn</NavLink>

                    </div>
                </div>
            </nav>
        </div>
    )
};

MainMenu.propTypes = {
    simplifiedMenu: PropTypes.bool,
};

export default MainMenu;