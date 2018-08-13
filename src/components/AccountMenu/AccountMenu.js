import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import thumb from '../../images/thumbplayer.png';
import { store } from "../../store";

import {
    Avatar,
    FontIcon,
    AccessibleFakeButton,
    IconSeparator,
    DropdownMenu,
    ListItem,

} from 'react-md';
import {Link} from 'react-router-dom'
import {setAuth} from "../../actions/index";
const AccountMenu = ({simplifiedMenu}) => (
    <DropdownMenu
        className={"tsAccountMenu"}
        id={`${!simplifiedMenu ? 'smart-' : ''}avatar-dropdown-menu`}
        menuItems={
            [
                <ListItem key={1} component={Link}  to="/profile" primaryText="Profile"/>,
                <ListItem key={2} component={Link}  to="/" primaryText="Log out" onClick={() => {
                    firebase.auth().signOut();
                    store.dispatch(setAuth('', '', false, '', ''));
                }} />,
            ]

        }
        anchor={{
            x: DropdownMenu.HorizontalAnchors.CENTER,
            y: DropdownMenu.VerticalAnchors.OVERLAP,
        }}
        position={DropdownMenu.Positions.TOP_LEFT}
        animationPosition="below"
        sameWidth
        simplifiedMenu={simplifiedMenu}
    >
        <AccessibleFakeButton
            component={IconSeparator}
            iconBefore
            label={
                <div className={"wrapProText"}>
                    <div>
                        <span className={"proName"}>{store.getState().myUsername}</span>
                        <div className={"viewLink"}>View profile</div>
                    </div>
                    <FontIcon>arrow_drop_down</FontIcon>
                </div>
            }
        >
            <Avatar src={store.getState().myProfileImage}></Avatar>
        </AccessibleFakeButton>
    </DropdownMenu>
);

AccountMenu.propTypes = {
    simplifiedMenu: PropTypes.bool,
};

export default AccountMenu;