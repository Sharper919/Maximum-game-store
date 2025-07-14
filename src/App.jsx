import './App.css';
import Header from './components/Header';
import GameComponent from './components/GameComponent'
import banner from './components/igri.jpeg';

function App() {
  return (
    <div className='App'>
      <Header/>
      <img src={banner} alt="Games" className="banner-image" />

      <div className="games-section">
        <h2 className="section-title">Games</h2>
        <hr className="section-line" />
      </div>
      <GameComponent />
    </div>
  );
}

export default App;
