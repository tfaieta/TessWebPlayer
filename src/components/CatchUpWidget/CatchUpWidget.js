import React from 'react';
import './style.scss'
import { Card, CardTitle, CardText, Media, MediaOverlay } from 'react-md';

const cardStyle = { maxWidth: 1290};

export const CatchUpWidget = (props) => (
    <Card style={cardStyle} className="md-block-centered">
        <CardTitle title="PodcastName" subtitle="By PodcastArtist"/>
        <CardText>
            <p>
                Podcast Description
            </p>
        </CardText>
    </Card>
);

export default CatchUpWidget;
