import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import profile from '../../images/profile.png';
import {store} from "../../store/index";
import NavLink from "react-router-dom/es/NavLink";


export const Profile = (props) => {
    return (
        <div className="tsProfile">
            <div>
                <div className="profileImg">
                    <img src={props.profileInfo.profileImage} alt="profile"/>
                </div>
                <h4>{store.getState().myUsername}</h4>
                <div className="follow">
                    <NavLink to='/editprofile'>
                        <a>{store.getState().auth.loggedIn ? 'EDIT PROFILE' : ''}</a>
                    </NavLink>
                </div>
                <div className="specialisation">{store.getState().myBio}</div>
            </div>
            <div className="info-wrap">
                <div>
                    Following <span>{props.userFollowing.length}</span>
                </div>
                <div>
                    Followers <span>{props.userFollowers.length}</span>
                </div>
                <div>
                    Tracking <span>{props.userTrackingList.length}</span>
                </div>
            </div>
        </div>
    )
}
Profile.propTypes = {}
