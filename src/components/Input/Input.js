import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import thumb from './icons/search.svg';
import {
    Button,
    FontIcon,
    SVGIcon,
    TextField,
} from 'react-md';

export const Input = (props) => {
    return (
        <div className="tsInput">
            <img src={thumb}/>
            <TextField
                id="application-search"
                className={"tsInputText"}
                label="Search"
                customSize="search"
                fullWidth={true}
            />
        </div>
    )
};
Input.propTypes = {};
