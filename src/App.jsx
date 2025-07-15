import './App.css';
import Header from './components/Header';
import GameComponent from './components/GameComponent'
import banner from './components/igri.jpeg';
import assassin from './images/assassin.avif'

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
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
        <GameComponent image={assassin} gameName='Assassin’s Creed Shadows' gamePrice='UAH 1,999'/>
      </div>
    </div>
  );
}

export default App;
