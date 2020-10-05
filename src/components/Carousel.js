import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import _items from '../data'

const initialLength = _items.length
const half = Math.floor(initialLength / 2)

if (initialLength < 5) _items.push(..._items)

const createItem = (pos, idx) => {
    const item = {
        styles: { transform: `translateX(${pos * 30}rem)` },
        player: _items[idx].player,
        pos: pos
    }

    switch (pos) {
        case half - 1:
        case half + 1:
            item.styles = { ...item.styles, filter: 'grayscale(1)' }
            break
        case half:
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

const keys = Array.from(Array(_items.length).keys())

const Carousel = () => {
    const [items, setItems] = useState(keys)
    const [step, setStep] = useState(0)
    const [isTicking, setIsTicking] = useState(false)
    const len = items.length

    const handleLeftClick = () => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => [...prev.slice(1), prev[0]])
        }
    }

    const handleRightClick = () => {
        if (!isTicking) {
            setIsTicking(true)
            setItems(prev => [prev[len - 1], ...prev.slice(0, len - 1)])
        }
    }

    useEffect(() => {
        if (isTicking) {
            setTimeout(() => {
                setIsTicking(false)
            }, 300)
        }
    }, [isTicking])

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
                    onClick={handleLeftClick}>
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
                    onClick={handleRightClick}>
                    <i className='carousel__btn-arrow carousel__btn-arrow--right' />
                </button>
                <div className='carousel__dots'>
                    {items.slice(0, initialLength).map((pos, i) => (
                        <button
                            key={i}
                            className={
                                pos % initialLength === 2 ? 'dot active' : 'dot'
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
