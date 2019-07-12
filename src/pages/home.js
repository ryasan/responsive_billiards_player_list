import React from 'react';

import Carousel from '../components/Carousel';
import Footer from '../components/Footer';

const HomePage = () => (
  <div className="page home-page">
    <header className="header home-header">
      <div className="inner">
        <h1>Greatest Billiard Players of All Time</h1>
        <p>
          My top 5 greatest players of all time. These
          players have all had amazing careers with countless achievements and
          titles.
        </p>
      </div>
    </header>
    <Carousel />
    <Footer />
  </div>
);

export default HomePage;
