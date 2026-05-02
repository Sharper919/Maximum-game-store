import React from 'react';
import '../../css/game_screen/GameScreen.css';
import Header from '../header/Header';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch, BASE_URL, isAuthenticated } from '../../api/client';

function GameScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(null);
    const [images, setImages] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [purchaseError, setPurchaseError] = useState('');
    const [purchaseMessage, setPurchaseMessage] = useState('');

    const addToCart = async () => {
        if (!isAuthenticated()) {
            navigate('/signin');
            return;
        }

        try {
            setPurchaseError('');
            const result = await apiFetch(`/api/cart/add/${id}`, { method: 'POST' });
            setPurchaseMessage(result.message || 'Added to cart');
        } catch (err) {
            if (err.status === 401) {
                navigate('/signin');
                return;
            }

            setPurchaseError(err.message || 'Failed to add game to cart');
            setPurchaseMessage('');
        }
    };

    const buyNow = () => {
        if (!isAuthenticated()) {
            navigate('/signin');
            return;
        }

        navigate(`/checkout?gameId=${id}`);
    };

    useEffect(() => {
        fetch(`${BASE_URL}/api/games/${id}/info`)
            .then(res => res.json())
            .then(data => setGame(data))
            .catch(err => console.error(err));

        fetch(`${BASE_URL}/api/games/${id}/images`)
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error(err));

        fetch(`${BASE_URL}/api/games/${id}/requirements`)
            .then(res => res.json())
            .then(data => setRequirements(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!game) return <div>Loading...</div>;

    const mainImage = images.length > 0
        ? `${BASE_URL}/${images[0]}`
        : '/placeholder.png';

    const minimum = requirements.find(r => r.requirementType === 'Minimum');
    const recommended = requirements.find(r => r.requirementType === 'Recommended');

    const infoFields = [
        { label: 'Genre', value: game.genres?.join(', ') },
        { label: 'Developer', value: game.developers?.join(', ') },
        { label: 'Publisher', value: game.publishers?.join(', ') },
        { label: 'Engine', value: game.engines?.join(', ') },
        { label: 'Modes', value: game.modes?.join(', ') },
        { label: 'Franchise', value: game.serie || '—' },
        { label: 'Release date', value: new Date(game.releaseDate).toLocaleDateString() }
    ];

    return (
        <div className="game-screen">
            <Header />

            <div className="game-screen-main">

                <h1>{game.title}</h1>

                <div className="game-screen-main-tob-block">

                    <div className="game-screen-image">
                        <img src={mainImage} alt={game.title} />
                    </div>

                    <div className="game-screen-main-tob-block-info">
                        <div className="buy-game">
                            <h3>Buy the game</h3>
                            <hr />
                            <div className="buy-game-content">
                                <span id='buy-game-content-price'><span>Price:</span> UAH {game.price}</span>
                                {purchaseMessage && <p className="purchase-message">{purchaseMessage}</p>}
                                {purchaseError && <p className="purchase-error">{purchaseError}</p>}
                                <div className="button-block">
                                    <button id="button-buy-now" onClick={buyNow}>Buy now</button>
                                    <button id="add-to-basket" onClick={addToCart}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="basic-information">
                            <h3>Basic information</h3>
                            <hr />
                            {infoFields.map((field, index) => (
                                <p key={index}>
                                    <span>{field.label}:</span> {field.value || '—'}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="about-this-game">
                    <h3>About this game</h3>
                    <hr />

                     <div className="about-this-game-content">
                        <p>{game.description}</p>

                        {images.slice(1).map((img, index) => (
                            <div key={index} className="about-this-game-img">
                                <img src={`${BASE_URL}/${img}`} alt="game" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="system-requirements">
                    <h3>System requirements</h3>
                    <hr />
                    <div className="system-requirements-content">
                        {minimum && (
                            <div className="system-requirements-minimum">
                                <p><span>Minimum:</span></p>
                                <p><span>OS:</span> {minimum.os}</p>
                                <p><span>Processor:</span> {minimum.cpu}</p>
                                <p><span>Memory:</span> {minimum.ramGb} GB RAM</p>
                                <p><span>Graphics:</span> {minimum.gpu}</p>
                                <p><span>DirectX:</span> {minimum.directX}</p>
                                <p><span>Storage:</span> {minimum.storageGb} GB</p>
                            </div>
                        )}

                        {recommended && (
                            <div className="system-requirements-recommended">
                                <p><span>Recommended:</span></p>
                                <p><span>OS:</span> {recommended.os}</p>
                                <p><span>Processor:</span> {recommended.cpu}</p>
                                <p><span>Memory:</span> {recommended.ramGb} GB RAM</p>
                                <p><span>Graphics:</span> {recommended.gpu}</p>
                                <p><span>DirectX:</span> {recommended.directX}</p>
                                <p><span>Storage:</span> {recommended.storageGb} GB</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GameScreen;
