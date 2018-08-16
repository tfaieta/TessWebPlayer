import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import profile from '../../images/profile.png';


export const Profile = (props) => {
    return (
        <div className="tsProfile">
            <div>
                <div className="profileImg">
                    <img src={props.profileInfo.profileImage} alt="profile"/>
                </div>
                <h4>{props.profileInfo.username}</h4>
                <div className="specialisation">{props.profileInfo.bio}</div>
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
