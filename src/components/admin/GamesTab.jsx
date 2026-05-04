import { BASE_URL } from '../../api/client';

export default function GamesTab({ games, onAdd, onDelete, disabled }) {
    return (
        <div>
            <button className="add-btn" onClick={onAdd} disabled={disabled}>Add Game</button>
            {games.length === 0 && <div className="admin-message">No games found.</div>}
            {games.length > 0 && (
            <table className="admin-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Release date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td>
                                {game.mainImage ? (
                                    <img src={`${BASE_URL}/${game.mainImage}`} alt={game.title} />
                                ) : (
                                    <div className="admin-image-placeholder">No image</div>
                                )}
                            </td>
                            <td>{game.title}</td>
                            <td>UAH {game.price}</td>
                            <td>{formatDate(game.releaseDate)}</td>
                            <td>
                                <button
                                    className="danger"
                                    onClick={() => onDelete(game.id)}
                                    disabled={disabled}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
}

function formatDate(date) {
    return date ? new Date(date).toLocaleDateString() : '-';
}
