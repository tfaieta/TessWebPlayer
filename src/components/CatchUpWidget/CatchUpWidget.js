import React from "react";
import { Col, Row, Carousel } from 'antd';
import {WidgetCard} from '../../components/WidgetCard/WidgetCard'
import "./style.scss";

export class CatchUpWidget extends React.Component {
    render() {
        return (
            <div className={"tsHeaderTitles"}>
                <h2 >Tracked Podcasts</h2>
                <Carousel dots="false">
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
                </Carousel>
            </div>
        );
    }
}

export default CatchUpWidget;

// Tabs I was on
// https://ant.design/components/card/
// https://ant.design/docs/react/getting-started
// TODO: All notes are in the notebook


