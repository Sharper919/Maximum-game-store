import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch, BASE_URL } from '../../api/client';

export default function GamesTab() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await apiFetch('/api/user/games');
        setGames(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load games');
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  if (isLoading) {
    return <div className="profile-message">Loading games...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  if (games.length === 0) {
    return <div className="profile-message">You do not own any games yet.</div>;
  }

  return (
    <div className="games">
      {games.map(game => (
        <div className="game-row" key={game.id}>
          {game.mainImage ? (
            <img src={`${BASE_URL}/${game.mainImage}`} alt={game.title} />
          ) : (
            <div className="game-cover-placeholder">No image</div>
          )}

          <div className="game-info">
            <h3>{game.title}</h3>
            <p>{game.genres?.length ? game.genres.join(' • ') : 'No genres'}</p>
          </div>

          <div className="game-actions">
            <button onClick={() => navigate(`/game/${game.id}`)}>Open</button>
          </div>
        </div>
      ))}
    </div>
  );
}
