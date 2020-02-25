import React, { useState } from 'react';

import slides from '../data.js';
import CarouselSlideItem from './CarouselSlideItem.js';

const Carousel = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [slideOrder, setSlideOrder] = useState(['s4', 's5', 's1', 's2', 's3']);
  const [slideStyles, setSlideStyles] = useState({});

  const rotate = (slides) => {
    const [s1, s2, s3, s4, s5] = slides
    setSlideStyles({
      [s1]: { transform: 'translateX(-60rem)', opacity: 0 },
      [s2]: { transform: 'translateX(-30rem)', opacity: 1 },
      [s3]: { transform: 'translateX(0)', opacity: 1 },
      [s4]: { transform: 'translateX(30rem)', opacity: 1 },
      [s5]: { transform: 'translateX(60rem)', opacity: 0 },
    });
    setSlideOrder(slides);
  };

  // rotate slides left by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [3, 4, 5, 1, 2]
  const rotateLeft = (spaces = 1) => {
    const s = slideOrder.map((_, i) => slideOrder[(i + spaces) % slideOrder.length]);

    setSelectedIdx((selectedIdx + spaces) % 5);
    rotate(s);
  };

  // rotate slides right by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [4, 5, 1, 2, 3]
  const rotateRight = (spaces = 1) => {
    const s = slideOrder.reduce((result, slide, i) => {
      result[(i + spaces) % slideOrder.length] = slide;
      return result;
    }, []);

    setSelectedIdx(4 - ((4 - selectedIdx + spaces) % 5));
    rotate(s);
  };

  const handleDotClick = idx => {
    if (idx > selectedIdx) {
      rotateLeft(idx - selectedIdx);
    } else if (idx < selectedIdx) {
      rotateRight(selectedIdx - idx);
    }
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-container">
        <button className="carousel-btn prev-btn" onClick={() => rotateLeft()}>
          <i className="carousel-btn__arrow left" />
        </button>
        <ul className="carousel-slide-list">
          {slides.map((slide, i) => (
            <CarouselSlideItem
              key={slide.id}
              slide={slide}
              style={slideStyles[`s${slide.id}`]}
              active={selectedIdx === i}
              className={`carousel-slide-item s${slide.id}`}
            />
          ))}
        </ul>
        <button className="carousel-btn next-btn" onClick={() => rotateRight()}>
          <i className="carousel-btn__arrow right" />
        </button>
      </div>
      <div className="carousel-dots">
        {slides.map((_, i) => {
          const className = selectedIdx === i ? 'dot active' : 'dot';
          return (
            <button
              key={i}
              className={className}
              onClick={() => handleDotClick(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
