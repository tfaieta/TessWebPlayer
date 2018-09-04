import React from 'react'
import {Header} from '../../components/Header/Header'
import {LearnCell} from '../../components/LearnCell/LearnCell'
import reddit from '../../images/reddit.svg';
import twitter from '../../images/twitter.svg';

export class Learn extends React.Component {
    render() {
        return (
            <div>
                <Header props={this.props}/>

                <div className="tcontent learn-page">
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="container">
                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>Learn More About Tess</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {Array.from(Array(4)).map((_, i) => (
                                        <div key={i} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            <LearnCell image={"url(../../images/thumbplayer.png)"}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="trow backLearn">
                                <div className="backWrap">
                                    <div className="comunity">
                                        <h4>Community</h4>
                                        <ul>
                                            <li><a href=""><img src={reddit} alt=""/></a></li>
                                            <li><a href=""><img src={twitter} alt=""/></a></li>
                                        </ul>
                                    </div>
                                    <div className="help">
                                        <h4>Need More Help?</h4>
                                        <ul>
                                            <li>
                                                <span>Email Us</span>
                                                <a href="mailto:team@discovertess.com">team@discovertess.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="download">
                                        <h4>Download</h4>
                                        <ul>
                                            <li><a href="#">iPhone App</a></li>
                                            <li><a href="#">Android App</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}