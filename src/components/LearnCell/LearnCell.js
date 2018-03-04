import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {Button} from 'react-md';

export const LearnCell = (props) => {
    return (
        <div className={"tsLearnCell"}>
            <div className="thumbWrap"
                 style={{backgroundImage: props.image}}>
            </div>
            <h4>What is Tess?</h4>
            <div className={"tsLearnGrid-desc"}>
                <p>
                    So you want to make a podcast on Tess? Read this guide first.
                </p>
            </div>
            <div className="tsLearnGrid-btnwrap">
                <Button className={"tsDefaultBtn"} href={"/upload"} raised>Get Started</Button>
            </div>
        </div>
    )
}
LearnCell.propTypes = {}
