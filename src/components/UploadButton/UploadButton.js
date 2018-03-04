import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {
    FileInput,
} from 'react-md';
export const UploadButton = (props) => {
    return (
        <div className="tsUploadButton">
            <FileInput id="image-upload" labelClassName={"uploadLabel"} accept="image/*" label={'Choose file'} name="images" icon={null} />
        </div>
    )
}
UploadButton.propTypes = {}
