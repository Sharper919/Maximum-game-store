export default function GamesTab() {
    return (
        <div>
            <button className="add-btn">+ Add Game</button>
            <button className="add-btn">+ Add Requirements</button>
            <button className="add-btn">+ Add Images</button>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Release date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img src="https://placehold.co/100x120" alt="Game 1" />
                        </td>
                        <td>Game 1</td>
                        <td>$20</td>
                        <td>2023-01-01</td>
                        <td>
                            <button>Edit</button>
                        </td>
                        <td>
                            <button className="danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}