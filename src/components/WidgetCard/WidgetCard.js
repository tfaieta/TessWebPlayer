import React from "react";
import { Card, Icon } from 'antd';
import "./style.scss";

const { Meta } = Card;

export class WidgetCard extends React.Component {
    render() {
        return (
            <div>
                <Card
                    style={{ width: 350 }}
                    cover={<img alt="example"
                                src="../images/Back.png" />}
                    actions={[<Icon type="play-circle" />, <Icon type="plus" />, <Icon type="cloud-download" />]}
                >
                    <Meta
                        title="Podcast Title"
                        description="This is the description"
                    />
                </Card>
            </div>
        );
    }
}

export default WidgetCard;
