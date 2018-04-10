import React from "react";
import Slider from "react-slick";
import "./style.scss";

export class CatchUpWidget extends React.Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider {...settings}>
                <div className="container">
                    <Slider {...settings}>
                        <div>
                            <img src="images/albmask.png"/>
                        </div>
                        <div>
                            <img src="images/albmask.png"/>
                        </div>
                        <div>
                            <img src="images/albmask.png"/>
                        </div>
                        <div>
                            <img src="images/albmask.png"/>
                        </div>
                    </Slider>
                </div>
            </Slider>
        );
    }
}

export default CatchUpWidget;



