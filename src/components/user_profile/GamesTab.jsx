export default function GamesTab() {
  return (
    <div className="games">
      {[1, 2, 3].map(i => (
        <div className="game-row" key={i}>
          <img src="https://placehold.co/100x120" alt="game" />
          
          <div className="game-info">
            <h3>Game {i}</h3>
            <p>Action • Adventure</p>
          </div>

          <div className="game-actions">
            <button>Play</button>
          </div>
        </div>
      ))}
    </div>
  );
}