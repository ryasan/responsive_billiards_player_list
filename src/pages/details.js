import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Footer from '../components/Footer'
import Gallery from '../components/Gallery'

const DetailsPage = ({ location: { state: details } }) => (
    <div className='page details-page'>
        <header className={`details-header p${details.id}`}>
            <div className='inner'>
                <h1>{details.player.title}</h1>
            </div>
        </header>
        <div className='details-content-wrap'>
            <div className='details-bread-crumbs'>
                <NavLink to='/'>Home</NavLink> / {details.player.title}
            </div>
            <Gallery gallery={details.player.gallery} />
            <div className='details-summary'>
                {details.player.summary.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </div>
        </div>
        <Footer />
    </div>
)

DetailsPage.propTypes = {
    details: PropTypes.object
}

export default DetailsPage
