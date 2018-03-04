import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import profile from '../../images/profile.png';


export const Profile = (props) => {
    return (
        <div className="tsProfile">
            <div>
                <div className="profileImg">
                    <img src={profile} alt="profile"/>
                </div>
                <h4>Joe Shmo</h4>
                <div className="specialisation">Things and other things.</div>
            </div>
            <div className="info-wrap">
                <div>
                    Followers <span>10</span>
                </div>
                <div>
                    Following <span>10</span>
                </div>
            </div>
        </div>
    )
}
Profile.propTypes = {}
