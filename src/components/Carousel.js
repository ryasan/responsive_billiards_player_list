import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import _items from '../data'

const slideWidth = 30
const initialLength = _items.length
const middle = arr => Math.floor(arr.length / 2)
const activeIdx = middle(_items)

const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

if (initialLength < 5) _items.push(..._items)

const createItem = (pos, idx) => {
    const item = {
        styles: { transform: `translateX(${pos * slideWidth}rem)` },
        player: _items[idx].player,
        pos: pos
    }

    switch (pos) {
        case activeIdx - 1:
        case activeIdx + 1:
            item.styles = { ...item.styles, filter: 'grayscale(1)' }
            break
        case activeIdx:
            break
        default:
            item.styles = { ...item.styles, opacity: 0 }
            break
    }

    return item
}

const CarouselSlideItem = ({ pos, idx }) => {
    const item = createItem(pos, idx)

    return (
        <li className='carousel__slide-item' style={item.styles}>
            <NavLink
                to={{
                    pathname: '/details',
                    search: `?player=${item.player.title}`,
                    state: item
                }}
                className='carousel__slide-item-img-link'>
                <img src={item.player.image} alt={item.player.title} />
            </NavLink>
            <div className='carousel-slide-item__body'>
                <h4>{item.player.title}</h4>
                <p>{item.player.desc}</p>
            </div>
        </li>
    )
}

const keys = Array.from(
    { length: _items.length },
    (item, i) => (i + activeIdx) % _items.length
)

const Carousel = () => {
    const [items, setItems] = useState(keys)
    const [isTicking, setIsTicking] = useState(false)
    const [currentIdx, setCurrentIdx] = useState(0)
    const len = items.length

    const handlePrevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => prev.map((_, i) => prev[(i + jump) % len]))
        }
    }

    const handleNextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => prev.map((_, i) => prev[(i - jump + len) % len]))
        }
    }

    const handleDotClick = idx => {
        if (idx < currentIdx) handleNextClick(currentIdx - idx)
        if (idx > currentIdx) handlePrevClick(idx - currentIdx)
    }

    useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false))
    }, [isTicking])

    useEffect(() => {
        setCurrentIdx(items[middle(items)])
    }, [items])

    const classes = [
        'carousel__slide-list',
        items.length % 2 === 0 ? 'even' : 'odd'
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className='carousel__wrap'>
            <div className='carousel__inner'>
                <button
                    className='carousel__btn carousel__btn--prev'
                    onClick={() => handlePrevClick()}>
                    <i className='carousel__btn-arrow carousel__btn-arrow--left' />
                </button>
                <div className='carousel__container'>
                    <ul className={classes}>
                        {items.map((pos, i) => (
                            <CarouselSlideItem key={i} idx={i} pos={pos} />
                        ))}
                    </ul>
                </div>
                <button
                    className='carousel__btn carousel__btn--next'
                    onClick={() => handleNextClick()}>
                    <i className='carousel__btn-arrow carousel__btn-arrow--right' />
                </button>
                <div className='carousel__dots'>
                    {items
                        .slice(0, initialLength)
                        .map((pos, i) => (
                            <button
                                key={i}
                                onClick={() => handleDotClick(i)}
                                className={
                                    i === currentIdx ? 'dot active' : 'dot'
                                }
                            />
                        ))
                        .reverse()}
                </div>
            </div>
        </div>
    )
}

export default Carousel
