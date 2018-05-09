import React from "react";
import { Card, Icon } from 'antd';
import "./style.scss";

const { Meta } = Card;

export class WidgetCard extends React.Component {
    render() {
        return (
            <div>
                <Card
                    style={{ width: 300}}
                    cover={<img alt="example"
                                src="https://dfkfj8j276wwv.cloudfront.net/images/26/72/78/e3/267278e3-d103-42af-85f8-ab90ce316661/3156a418f4db34f8c868fc8f8ebed16712a6cca272361cdd5ce4faf54cb503b630594dc6b08a5b696b84af25dd6603e2fbec63fd7f45c9860f759bf466a68bbf.jpeg" />}
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
