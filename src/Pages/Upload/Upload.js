import React from 'react'
import {Header} from '../../components/Header/Header'
import {Categories} from '../../components/Categories/Categories'
import {
    Button,
    CardActions,
    TextField,
} from 'react-md';


import {UploadButton} from '../../components/UploadButton/UploadButton'

export class Upload extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();

    };

    render() {
        return (
            <div>
                <Header props={this.props}/>

                <div className="tcontent upload-page">
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">

                            <div className={"uploadWrap"}>
                                <h2>Upload to your channel</h2>
                                <UploadButton/>
                            </div>

                            <div className={"whiteBack"}>

                                <div className="halfBlock">
                                    <form className="text-fields__application" onSubmit={this.handleSubmit}>
                                        <TextField
                                            fullWidth
                                            id="application-name"
                                            label="Title"
                                            defaultValue=""
                                            customSize="name"
                                            required
                                        />

                                        <TextField
                                            fullWidth
                                            id="application-desc"
                                            label="Description"
                                            customSize="desc"
                                            rows={1}
                                            required
                                            defaultValue=""
                                        />
                                        <div className={"uploadCategoriesWrap"}>
                                            <h4>Choose Category</h4>
                                            <Categories/>
                                        </div>
                                        <div className={"formBtnWrap"}>
                                            <Button className={"tsDefaultBtn"} type="submit" raised>Upload</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}