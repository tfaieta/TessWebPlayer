import React from "react";
import { Col, Row } from 'antd';
import Slider from "react-slick";
import {WidgetCard} from '../../components/WidgetCard/WidgetCard'
import "./style.scss";

export class CatchUpWidget extends React.Component {
    render() {
        var settings = {
            dots: false,
            centerMode: true

        };
        return (
            <div className={"tsHeaderTitles"}>
                <h2 >Tracked Podcasts</h2>
                <Slider {...settings}>
                    <div>
                        <div>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                                <Col span={8}>
                                    <WidgetCard/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}

export default CatchUpWidget;

// Tabs I was on
// https://ant.design/components/card/
// https://ant.design/docs/react/getting-started
// TODO: All notes are in the notebook


