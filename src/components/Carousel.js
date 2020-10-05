import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import _items from '../data'

const CarouselSlideItem = ({ item }) => (
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

const len = _items.length
const half = Math.floor(len / 2)
const cycle = _items.map((_, i) => `${i * 30}rem`)

const addStyles = (item, pos) => {
    item.styles = {
        transform: `translateX(${cycle[pos]})`
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

const Carousel = () => {
    const [items, setItems] = useState(_items.map(addStyles))
    const [step, setStep] = useState(0)
    const [isTicking, setIsTicking] = useState(false)

    const handleLeftClick = () => {
        if (!isTicking) {
            setIsTicking(true)
            setStep(prev => (prev + 1 + len) % len)
            setItems(items =>
                items.map((item, i) => {
                    const xPos = (i + step + 1) % len
                    return { ...addStyles(item, xPos) }
                })
            )
        }
    }

    const handleRightClick = () => {
        if (!isTicking) {
            setIsTicking(true)
            setStep(prev => (prev - 1 + len) % len)
            setItems(items =>
                items.map((item, i) => {
                    const xPos = (i + step + len - 1) % len
                    return { ...addStyles(item, xPos) }
                })
            )
        }
    }

    useEffect(() => {
        if (isTicking) {
            setTimeout(() => {
                setIsTicking(false)
            }, 300)
        }
    }, [isTicking])

    return (
        <div className='carousel__wrap'>
            <div className='carousel__inner'>
                <button
                    className='carousel__btn carousel__btn--prev'
                    onClick={handleLeftClick}>
                    <i className='carousel__btn-arrow carousel__btn-arrow--left' />
                </button>
                <div className='carousel__container'>
                    <ul className='carousel__slide-list'>
                        {items.map((item, i) => (
                            <CarouselSlideItem key={i} item={item} />
                        ))}
                    </ul>
                </div>
                <button
                    className='carousel__btn carousel__btn--next'
                    onClick={handleRightClick}>
                    <i className='carousel__btn-arrow carousel__btn-arrow--right' />
                </button>
                <div className='carousel__dots'>
                    {items
                        .map((_, i) => (
                            <button
                                key={i}
                                className={step === i ? 'dot active' : 'dot'}
                            />
                        ))
                        .reverse()}
                </div>
            </div>
        </div>
    )
}

export default Carousel
