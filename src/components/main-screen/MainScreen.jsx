import '../../css/main-screen/MainScreen.css';
import Header from '../header/Header';
import GameComponent from './GameComponent'
import banner from './igri.jpeg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://localhost:7151';

function MainScreen() {
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    navigate(`/game/${game.id}`);
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/games`)
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div id='main-screen'>
      <Header />
      <img src={banner} alt="Games" className="banner-image" />

      <div className="games-section">
        <h2 className="section-title">Games</h2>
        <hr className="section-line" />
      </div>
      <div className="games-list">
        {games.map((game) => (
          <GameComponent
            key={game.id}
            image={`${BASE_URL}/${game.mainImage}`}
            gameName={game.title}
            gamePrice={`UAH ${game.price}`}
            onClick={() => handleGameClick(game)}
          />
        ))}
      </div>
    </div>
  );
}

export default MainScreen;
