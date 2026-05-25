import '../../css/main-screen/MainScreen.css';
import Header from '../header/Header';
import GameComponent from './GameComponent'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiFetch, BASE_URL } from '../../api/client';
import Footer from '../footer/Footer';

const featureConfigs = [
  { key: 'genres', label: 'Genre', path: '/api/admin/genres', queryKey: 'genreId' },
  { key: 'developers', label: 'Developer', path: '/api/admin/developers', queryKey: 'developerId' },
  { key: 'engines', label: 'Engine', path: '/api/admin/engines', queryKey: 'engineId' },
  { key: 'series', label: 'Series', path: '/api/admin/series', queryKey: 'serieId' },
  { key: 'publishers', label: 'Publisher', path: '/api/admin/publishers', queryKey: 'publisherId' },
  { key: 'modes', label: 'Mode', path: '/api/admin/modes', queryKey: 'modeId' }
];

const emptyFilters = featureConfigs.reduce((filters, config) => {
  filters[config.queryKey] = '';
  return filters;
}, {});

function MainScreen() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [features, setFeatures] = useState({});
  const [filters, setFilters] = useState(emptyFilters);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGameClick = (game) => {
    navigate(`/game/${game.id}`);
  };

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        setError('');
        setGames(await apiFetch('/api/games'));
      } catch (err) {
        setError(err.message || 'Failed to load games');
      } finally {
        setIsLoading(false);
      }

      try {
        const responses = await Promise.all(
          featureConfigs.map(config => apiFetch(config.path))
        );

        setFeatures(featureConfigs.reduce((nextFeatures, config, index) => {
          nextFeatures[config.key] = normalizeFeatures(responses[index]);
          return nextFeatures;
        }, {}));
      } catch (err) {
        console.error(err);
      }
    }

    loadInitialData();
  }, []);

  const loadGames = async (nextFilters = filters, nextSearch = search) => {
    try {
      setIsLoading(true);
      setError('');

      const normalizedSearch = nextSearch.trim();
      const hasSearch = normalizedSearch.length > 0;
      const hasFilters = Object.values(nextFilters).some(Boolean);

      if (hasSearch && hasFilters) {
        const [nameGames, featureGames] = await Promise.all([
          apiFetch(`/api/games/filter/name?search=${encodeURIComponent(normalizedSearch)}`),
          apiFetch(`/api/games/filter/features?${buildFeatureQuery(nextFilters)}`)
        ]);
        const featureIds = new Set(featureGames.map(game => game.id));
        setGames(nameGames.filter(game => featureIds.has(game.id)));
        return;
      }

      if (hasSearch) {
        setGames(await apiFetch(`/api/games/filter/name?search=${encodeURIComponent(normalizedSearch)}`));
        return;
      }

      if (hasFilters) {
        setGames(await apiFetch(`/api/games/filter/features?${buildFeatureQuery(nextFilters)}`));
        return;
      }

      setGames(await apiFetch('/api/games'));
    } catch (err) {
      setError(err.message || 'Failed to load games');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);

    if (!value.trim()) {
      loadGames(filters, '');
    }
  };

  const handleSearchSubmit = (value) => {
    loadGames(filters, value);
  };

  const handleFilterChange = (queryKey, value) => {
    const nextFilters = { ...filters, [queryKey]: value };
    setFilters(nextFilters);
    loadGames(nextFilters, search);
  };

  const resetFilters = () => {
    setFilters(emptyFilters);
    loadGames(emptyFilters, search);
  };

  return (
    <div id='main-screen'>
      <Header
        showSearch={true}
        searchValue={search}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <img src={`${BASE_URL}/images/others/igri.jpeg`} alt="Games" className="banner-image" />

      <div className="filters-panel">
        {featureConfigs.map(config => (
          <label className="filter-field" key={config.key}>
            <span>{config.label}</span>
            <select
              value={filters[config.queryKey]}
              onChange={(event) => handleFilterChange(config.queryKey, event.target.value)}
            >
              <option value="">All</option>
              {(features[config.key] || []).map(feature => (
                <option key={feature.id} value={feature.id}>
                  {feature.name}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button type="button" className="filters-reset" onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className="games-section">
        <h2 className="section-title">{search || Object.values(filters).some(Boolean) ? 'Found games' : 'Games'}</h2>
        <hr className="section-line" />
      </div>

      {error && <div className="games-message">{error}</div>}
      {isLoading && <div className="games-message">Loading games...</div>}

      <div className="games-list">
        {!isLoading && games.length === 0 && (
          <div className="games-message">No games found.</div>
        )}

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
      <Footer />
    </div>
  );
}

function buildFeatureQuery(filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  return params.toString();
}

function normalizeFeatures(features) {
  return (features || [])
    .map(feature => ({
      id: Number(feature.id),
      name: feature.name
    }))
    .filter(feature => feature.id && feature.name)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default MainScreen;
