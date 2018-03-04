import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import fitness from './icons/fitness.png';
import games from './icons/games.png';
import megaphone from './icons/megaphone.png';
import movie from './icons/movie.png';
import news from './icons/news.png';
import sports from './icons/sports.png';

export const Categories = (props) => {
    return (
        <div className="tsCategories">
                <div  className={"categoriesWrap"}>
                    <ul>
                        <li><img src={fitness} alt=""/></li>
                        {/*can add class .active*/}
                        <li><img src={games} alt=""/></li>
                        <li><img src={megaphone} alt=""/></li>
                        <li><img src={movie} alt=""/></li>
                        <li><img src={news} alt=""/></li>
                        <li><img src={sports} alt=""/></li>
                    </ul>
                </div>
        </div>
    )
}
Categories.propTypes = {}
