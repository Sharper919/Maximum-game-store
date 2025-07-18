import './App.css';
import Header from './components/Header';
import GameComponent from './components/GameComponent'
import banner from './components/igri.jpeg';
import assassin from './images/assassin.avif'
import stalker2 from './images/stalker2.png'
import importals33 from './images/33importals.png'
import spiderman2 from './images/spiderman2.png'
import lastofus2rem from './images/lastofus2rem.png'
import codbo6 from './images/codbo6.png'
import truck from './images/truck.png'
import monsterhunt from './images/monsterhunt.png'


const games = [
    { image: assassin, gameName: "Assassin’s Creed Shadows", gamePrice: "UAH 1,999" },
    { image: importals33, gameName: "33 Immortals", gamePrice: "UAH 369" },
    { image: spiderman2, gameName: "Marvel’s Spider-Man 2", gamePrice: "UAH 1,699" },
    { image: stalker2, gameName: "S.T.A.L.K.E.R. 2: Heart of Chornobyl", gamePrice: "UAH 1,399" },
    { image: lastofus2rem, gameName: "The Last of Us Part II Remastered", gamePrice: "UAH 1,499" },
    { image: codbo6, gameName: "Call of Duty: Black Ops 6", gamePrice: "UAH 2,399" },
    { image: truck, gameName: "American Truck Simulator - Missouri", gamePrice: "UAH 240" },
    { image: monsterhunt, gameName: "Monster Hunter Wilds", gamePrice: "UAH 1,999" }
];


function App() {
  return (
    <div className='App'>
      <Header/>
      <img src={banner} alt="Games" className="banner-image" />

      <div className="games-section">
        <h2 className="section-title">Games</h2>
        <hr className="section-line" />
      </div>
      <div className="games-list">
            {games.map(game => (
                <GameComponent
                    image={game.image}
                    gameName={game.gameName}
                    gamePrice={game.gamePrice}
                />
            ))}
      </div>
    </div>
  );
}

export default App;
