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
    { id: 1, image: assassin, gameName: "Assassin’s Creed Shadows", gamePrice: "UAH 1,999" },
    { id: 2, image: importals33, gameName: "33 Immortals", gamePrice: "UAH 369" },
    { id: 3, image: spiderman2, gameName: "Marvel’s Spider-Man 2", gamePrice: "UAH 1,699" },
    { id: 4, image: stalker2, gameName: "S.T.A.L.K.E.R. 2: Heart of Chornobyl", gamePrice: "UAH 1,399" },
    { id: 5, image: lastofus2rem, gameName: "The Last of Us Part II Remastered", gamePrice: "UAH 1,499" },
    { id: 6, image: codbo6, gameName: "Call of Duty: Black Ops 6", gamePrice: "UAH 2,399" },
    { id: 7, image: truck, gameName: "American Truck Simulator - Missouri", gamePrice: "UAH 240" },
    { id: 8, image: monsterhunt, gameName: "Monster Hunter Wilds", gamePrice: "UAH 1,999" }
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
            {games.map((game) => (
                <GameComponent
                    key={game.id}
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
