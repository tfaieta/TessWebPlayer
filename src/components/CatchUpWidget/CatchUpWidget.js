import React from "react";
import { Carousel } from 'antd';
import "./style.scss";

export class CatchUpWidget extends React.Component {
    render() {
        return (
            <div className={"tsHeaderTitles"}>
                <h2>Tracked Podcasts</h2>
                <Carousel dots="false"  autoplay>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>
        );
    }
}

export default CatchUpWidget;



