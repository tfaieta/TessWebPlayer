import React from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Track} from '../../components/Track/Track'

export class Featured extends React.Component {
    render() {
        return (
            <div>
                <Header/>

                <div className="tcontent">
                    <AsideNav/>
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="container">

                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>Push To Master</h2>
                                        <span className={"subtitle"}>HOW DO YOU MAKE A PODCAST PLATFORM?</span>
                                    </div>
                                </div>

                                <div className="row">
                                    {Array.from(Array(32)).map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i}/>
                                        </div>
                                    ))}
                                </div>

                                <div className="trow-header">
                                    <div className={"tsHeaderTitles"}>
                                        <h2>theUpdate</h2>
                                        <span className={"subtitle"}>Fresh Updates From Tess</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {Array.from(Array(21)).map((_, i) => (
                                        <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                            <Track menukey={i}/>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}