import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Gallery = ({ gallery }) => {
    const [selectedIdx, setSelectedIdx] = useState(0)

    return (
        <div className='gallery-wrap'>
            {gallery.map((image, i) => {
                const className =
                    selectedIdx === i
                        ? `gallery-selected-img-container active`
                        : `gallery-selected-img-container`
                return (
                    <div key={i} className={className}>
                        <img src={image} alt={`main-${selectedIdx}`} />
                    </div>
                )
            })}
            <ul className='gallery-list'>
                {gallery.map((image, i) => (
                    <li
                        key={i}
                        className='gallery-item'
                        onClick={() => setSelectedIdx(i)}>
                        <img src={image} alt={`gallery-${i}`} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

Gallery.propTypes = {
    gallery: PropTypes.arrayOf(PropTypes.string)
}

export default Gallery
