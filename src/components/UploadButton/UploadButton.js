import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {
    FileInput,
} from 'react-md';
import {store} from "../../store/index";
import {updateFile} from "../../actions/index";
export const UploadButton = (props) => {
    return (
        <div className="tsUploadButton">
            <FileInput id="episode-upload" labelClassName={"uploadLabel"} accept="audio/*" label={store.getState().upload.file.name != '' ? store.getState().upload.file.name : 'Choose file'} multiple={false} allowDuplicates={false} name="episodes" icon={null} disabled={!store.getState().auth.loggedIn}
                       onChange={(file) => {
                           console.log(file);
                           store.dispatch(updateFile(file));
                       }}
            />
        </div>
    )
}
UploadButton.propTypes = {}
