import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {Input} from '../Input/Input'
import AccountMenu from '../AccountMenu/AccountMenu';
import MainMenu from '../MainMenu/MainMenu';

export const Header = (props) => {
    return (
        <div className="tsHeader">
            <div className="trow theader-row">
                <div className="tSearchWrap">
                    <Input/>
                </div>
                <div className="tMainMenuWrap">
                    <MainMenu/>
                </div>
                <div className="tProfileWrap">
                    <AccountMenu/>
                </div>
            </div>
        </div>
    )
};
Header.propTypes = {};
