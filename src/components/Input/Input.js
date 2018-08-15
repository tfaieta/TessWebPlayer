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
import { store } from "../../store";
import { updateSearchValue } from "../../actions";

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
                onChange={(value) => {store.dispatch(updateSearchValue(value))}}
                onKeyPress={(ev) => {
                    console.log(`${ev.key}`);
                    if (ev.key === 'Enter' && store.getState().searchValue != '') {
                        ev.preventDefault();
                        props.props.props.history.push(`/search?${store.getState().searchValue}`)
                    }
                }}
            />
        </div>
    )
};
Input.propTypes = {};
