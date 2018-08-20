import React from 'react'
import {Header} from '../../components/Header/Header'
import {Categories} from '../../components/Categories/Categories'
import {
    Button,
    CardActions,
    TextField,
    SelectField
} from 'react-md';
import firebase from 'firebase';
import {UploadButton} from '../../components/UploadButton/UploadButton'
import {store} from "../../store/index";
import {updateFile, updateUploadCategory, updateUploadDescription, updateUploadTitle} from "../../actions/index";


export class Upload extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            message: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({message: ''});
        if(store.getState().upload.file.name != ''){
            if(store.getState().upload.title != ''){
                if(store.getState().upload.description != ''){
                    if(store.getState().upload.category != '' && store.getState().upload.category != 'Select a Category'){
                        this.setState({message: 'Upload starting...'});

                        // upload here
                        const {currentUser} = firebase.auth();
                        const user = currentUser.uid;
                        console.log(user);
                        if(user){

                            let likes = 0;
                            let ref = '';
                            let id = '';
                            let podcastTitle = store.getState().upload.title;
                            let podcastDescription = store.getState().upload.description;
                            let podcastCategory = store.getState().upload.category;
                            let podcastArtist = user;

                            console.log(podcastTitle);
                            firebase.database().ref(`/podcasts`)
                                .push({podcastTitle, podcastDescription, podcastCategory, podcastArtist, likes, time: firebase.database.ServerValue.TIMESTAMP})
                                .then((snap) => {
                                    ref = snap.ref;
                                    id = snap.key;

                                    ref.update({id});
                                    firebase.database().ref(`/users/${currentUser.uid}`).child('podcasts').child(id).update({id});
                                    console.log(id);

                                    var podcastRef = firebase.storage().ref(`/users/${currentUser.uid}/${snap.key}`).put(store.getState().upload.file);
                                    podcastRef.on('state_changed', function(snapshot){
                                        // Observe state change events such as progress, pause, and resume
                                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        console.log('Upload is ' + progress + '% done');
                                        this.setState({message: 'Uploading... ' + progress.toFixed(0) + '%'});
                                        switch (snapshot.state) {
                                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                                console.log('Upload is paused');
                                                this.setState({message: 'Upload is paused'});
                                                break;
                                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                                console.log('Upload is running');
                                                break;
                                        }
                                    }.bind(this), function(error) {
                                        // Handle unsuccessful uploads
                                        console.log('Error: ' , error);
                                        this.setState({message: 'Error when uploading'});
                                    }.bind(this), function() {
                                        // Handle successful uploads on complete
                                        podcastRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                            console.log('File available at', downloadURL);
                                        });
                                        console.log('Upload successful');
                                        this.setState({message: 'Upload successful'});
                                        store.dispatch(updateUploadTitle(''));
                                        store.dispatch(updateUploadDescription(''));
                                        store.dispatch(updateUploadCategory(''));
                                        store.dispatch(updateFile({name: ''}));
                                    }.bind(this));

                                })
                        }
                    }
                    else{
                        this.setState({message: 'Category Required'})
                    }
                }
                else{
                    this.setState({message: 'Description Required'})
                }
            }
            else{
                this.setState({message: 'Title Required'})
            }
        }
        else{
            this.setState({message: 'No File Chosen'})
        }

    };

    render() {
        let categories = ['News', 'Fitness', 'Society & Culture', 'Religion & Spirituality', 'Comedy', 'Lifestyle', 'Science & Nature', 'Travel', 'Learn Something', 'Storytelling', 'Sports', 'Entertainment', 'Music', 'Tech', 'Business', 'Gaming'];

        return (
            <div>
                <Header props={this.props}/>

                <div className="tcontent upload-page">
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">

                            <div className={"uploadWrap"}>
                                <h2>{store.getState().auth.loggedIn ? 'Upload to your channel' : 'Log In to upload to your channel'}</h2>
                                <UploadButton/>
                            </div>

                            <div className={"whiteBack"}>

                                <div className="halfBlock">
                                    <a>{this.state.message != '' ? this.state.message : ''}</a>
                                    <form className="text-fields__application" onSubmit={this.handleSubmit}>
                                        <TextField
                                            fullWidth
                                            id="application-name"
                                            label="Title"
                                            defaultValue={store.getState().upload.title}
                                            value={store.getState().upload.title}
                                            customSize="name"
                                            required
                                            onChange={(text) => {
                                                store.dispatch(updateUploadTitle(text));
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            id="application-desc"
                                            label="Description"
                                            customSize="desc"
                                            rows={1}
                                            required
                                            defaultValue={store.getState().upload.description}
                                            value={store.getState().upload.description}
                                            onChange={(text) => {
                                                store.dispatch(updateUploadDescription(text));
                                            }}
                                        />
                                        <div className={"uploadCategoriesWrap"}>
                                            <h4>Choose Category</h4>
                                            <SelectField defaultValue='' value={store.getState().upload.category} placeholder="Select a Category" defaultVisible={false} menuItems={categories} required
                                                         onChange={(value) => {
                                                             store.dispatch(updateUploadCategory(value));
                                                         }}
                                            />
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