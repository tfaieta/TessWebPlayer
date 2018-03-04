import React from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import {Categories} from '../../components/Categories/Categories'
import {Track} from '../../components/Track/Track'

export class Browse extends React.Component {
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
                                        <h1>Browse</h1>
                                        <span className={"subtitle"}>All Podcasts On Tess</span>
                                    </div>
                                    <Categories/>
                                </div>
                                <div className="row">
                                    {Array.from(Array(32)).map((_, i) => (
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