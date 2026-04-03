export default function GamesTab() {
  return (
    <div className="grid">
      {[1, 2, 3].map(i => (
        <div className="game-card" key={i}>
          <img src="https://placehold.co/150" alt="game" />
          <h3>Game {i}</h3>
          <button>Play</button>
        </div>
      ))}
    </div>
  );
}