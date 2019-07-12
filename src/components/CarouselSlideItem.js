import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CarouselSlideItem = ({ slide, style, className, active }) => (
  <li className={className} style={style}>
    <NavLink
      className="carousel-slide-item__img-link"
      to={{
        pathname: '/details',
        search: `?player=${slide.title}`,
        state: slide,
      }}>
      <img
        src={slide.image}
        className={active ? 'active' : ''}
        alt={slide.id}
      />
    </NavLink>
    <div className="carousel-slide-item__body">
      <h4>{slide.title}</h4>
      <p>{slide.desc}</p>
    </div>
  </li>
);

CarouselSlideItem.propTypes = {
  className: PropTypes.string.isRequired,
  slide: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

export default CarouselSlideItem;
