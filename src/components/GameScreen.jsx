import React from 'react';
import './GameScreen.css';
import Header from './Header';
import assassin from '../images/assassin.avif'
import assassi1 from '../images/assassin-1.png'
import assassi2 from '../images/assassin-2.png'


function GameScreen() {
    return (
        <div className="game-screen">
            <Header />

            <div className="game-screen-main">

                <h1>Assassin’s Creed Shadows</h1>

                <div className="game-screen-main-tob-block">

                    <div className="game-screen-image">
                        <img src={assassin} alt="Assassin’s Creed Shadows" />
                    </div>

                    <div className="game-screen-main-tob-block-info">
                        <div className="buy-game">
                            <h3>Buy the game</h3>
                            <hr />
                            <div className="buy-game-content">
                                <span id='buy-game-content-price'><span>Price:</span> UAH 1,999</span>
                                <div className="button-block">
                                    <button id="button-buy-now">Buy Now</button>
                                    <button id="button-buy-now">Add to basket</button>
                                </div>
                            </div>
                        </div>

                        <div className="basic-information">
                            <h3>Basic information</h3>
                            <hr />
                            <p><span>Genre:</span> Action, Adventure, Role-playing games</p>
                            <p><span>Developer:</span> Ubisoft</p>
                            <p><span>Publisher:</span> Ubisoft</p>
                            <p><span>Platforms:</span> PlayStation 5</p>
                            <p><span>Franchise:</span> Assassin's Creed</p>
                            <p><span>Release date:</span> March 20. 2025</p>
                            <p><span>Language:</span> English</p>
                        </div>
                    </div>

                </div>

                <div className="about-this-game">
                    <h3>About this game</h3>
                    <hr />

                    <div className="about-this-game-content">
                        <p>Experience a new epic story filled with action and thrilling adventure.
                            Explore the open world of feudal Japan, from spectacular fortress cities and bustling ports to
                            tranquil shrines and war-torn landscapes. You'll experience unpredictable weather, changing seasons,
                            and environments that react to your actions. Take on the roles of the shinobi assassin Naoe and the
                            legendary samurai Yasuke, learn their incredible stories, and master their complementary playstyles.</p>
                        <div className="about-this-game-img-1">
                            <img src={assassi1} alt="assassi1" />
                        </div>
                        <p>Take on the roles of the shinobi assassin Naoe and the legendary samurai Yasuke,
                            learn their incredible stories, and master their complementary playstyles.</p>
                        <div className="about-this-game-img-2">
                            <img src={assassi2} alt="assassi2" />
                        </div>
                    </div>

                </div>

                <div className="system-requirements">
                    <h3>System requirements</h3>
                    <hr />
                    <div className="system-requirements-content">
                        <div className="system-requirements-minimum">
                            <p><span>Minimum:</span></p>
                            <p><span>OS:</span> Windows 10/11</p>
                            <p><span>Processor:</span> INTEL® Core TM i7 8700K AMD RYZEN 5 3600</p>
                            <p><span>Memory:</span> 16 GB RAM</p>
                            <p><span>Graphics:</span> NVIDIA® GEFORCE GTX 1650 4GB / AMD RX-5500 XT 8GB / INTEL® ARC TM A380 6GB (REBAR ON)</p>
                            <p><span>DirectX:</span> Version 12</p>
                            <p><span>Storage:</span> 115 GB available space</p>
                        </div>
                        <div className="system-requirements-recommended">
                            <p><span>Recommended:</span></p>
                            <p><span>OS:</span> Windows 10/11</p>
                            <p><span>Processor:</span> Intel® Core™ i5 11600k/AMD Ryzen™ 5 5600x</p>
                            <p><span>Memory:</span> 16 GB RAM</p>
                            <p><span>Graphics:</span> Nvidia® GeForce RTX™ 3060Ti 8GB/AMD Radeon™ RX 6700 XT 12GB/Intel® Arc™ B580 12GB (REBAR ON)</p>
                            <p><span>DirectX:</span> Version 12</p>
                            <p><span>Storage:</span> 115 GB available space</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GameScreen;
