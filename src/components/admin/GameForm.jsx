import React, { useEffect, useMemo, useRef, useState } from 'react';
import FeatureSelect from './FeatureSelect';
import RequirementBlock from './RequirementBlock';
import { apiFetch } from '../../api/client';
import '../../css/admin/GameForm.css';

const featureConfigs = {
    genres: { label: 'Genres', path: '/api/admin/genres', formKey: 'genreIds', multiple: true },
    developers: { label: 'Developers', path: '/api/admin/developers', formKey: 'developerIds', multiple: true },
    publishers: { label: 'Publishers', path: '/api/admin/publishers', formKey: 'publisherIds', multiple: true },
    modes: { label: 'Modes', path: '/api/admin/modes', formKey: 'modeIds', multiple: true },
    engines: { label: 'Engines', path: '/api/admin/engines', formKey: 'engineIds', multiple: true },
    series: { label: 'Series', path: '/api/admin/series', formKey: 'seriesId', multiple: false }
};

const emptyRequirement = {
    os: '',
    cpu: '',
    gpu: '',
    ramGb: '',
    storageGb: '',
    directX: ''
};

const emptyForm = {
    name: '',
    description: '',
    price: '',
    releaseDate: '',
    seriesId: '',
    genreIds: [],
    developerIds: [],
    publisherIds: [],
    modeIds: [],
    engineIds: [],
    minReq: { ...emptyRequirement },
    recReq: { ...emptyRequirement }
};

export default function GameForm({ isOpen = true, onClose, onSave, onSaved }) {
    const [form, setForm] = useState(emptyForm);
    const [options, setOptions] = useState({
        genres: [],
        developers: [],
        publishers: [],
        modes: [],
        engines: [],
        series: []
    });
    const [newFeatureNames, setNewFeatureNames] = useState({});
    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const imageUrlsRef = useRef([]);

    const featureKeys = useMemo(() => Object.keys(featureConfigs), []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        let ignore = false;

        async function loadFeatures() {
            try {
                setIsLoading(true);
                setError('');

                const responses = await Promise.all(
                    featureKeys.map(key => apiFetch(featureConfigs[key].path))
                );

                if (ignore) {
                    return;
                }

                setOptions(featureKeys.reduce((nextOptions, key, index) => {
                    nextOptions[key] = normalizeFeatures(responses[index]);
                    return nextOptions;
                }, {}));
            } catch (err) {
                if (!ignore) {
                    setError(err.message || 'Failed to load form options');
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadFeatures();

        return () => {
            ignore = true;
        };
    }, [featureKeys, isOpen]);

    useEffect(() => () => {
        imageUrlsRef.current.forEach(preview => URL.revokeObjectURL(preview));
    }, []);

    if (!isOpen) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleRequirementChange = (type, field, value) => {
        setForm(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));
    };

    const handleFeatureChange = (key, event) => {
        const config = featureConfigs[key];

        if (config.multiple) {
            const selectedIds = Array.from(event.target.selectedOptions, option => Number(option.value));
            setForm(prev => ({ ...prev, [config.formKey]: selectedIds }));
            return;
        }

        setForm(prev => ({ ...prev, [config.formKey]: event.target.value ? Number(event.target.value) : '' }));
    };

    const addFeature = async (key) => {
        const config = featureConfigs[key];
        const name = (newFeatureNames[key] || '').trim();

        if (!name) {
            return;
        }

        const existing = options[key].find(option => option.name.toLowerCase() === name.toLowerCase());

        if (existing) {
            selectFeature(config, existing.id);
            setNewFeatureNames(prev => ({ ...prev, [key]: '' }));
            return;
        }

        try {
            setError('');
            const createdId = await apiFetch(config.path, {
                method: 'POST',
                body: JSON.stringify({ name })
            });
            const newOption = { id: Number(createdId), name };

            setOptions(prev => ({
                ...prev,
                [key]: [...prev[key], newOption].sort((a, b) => a.name.localeCompare(b.name))
            }));
            selectFeature(config, newOption.id);
            setNewFeatureNames(prev => ({ ...prev, [key]: '' }));
        } catch (err) {
            setError(err.message || `Failed to add ${config.label}`);
        }
    };

    const selectFeature = (config, id) => {
        setForm(prev => {
            if (!config.multiple) {
                return { ...prev, [config.formKey]: id };
            }

            if (prev[config.formKey].includes(id)) {
                return prev;
            }

            return { ...prev, [config.formKey]: [...prev[config.formKey], id] };
        });
    };

    const handleImagesChange = (event) => {
        imageUrlsRef.current.forEach(preview => URL.revokeObjectURL(preview));

        const nextImages = Array.from(event.target.files || []).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        imageUrlsRef.current = nextImages.map(image => image.preview);
        setImages(nextImages);
        setMainImageIndex(nextImages.length > 0 ? 0 : null);
    };

    const removeImage = (index) => {
        const removed = images[index];
        if (removed) {
            URL.revokeObjectURL(removed.preview);
        }

        const nextImages = images.filter((_, imageIndex) => imageIndex !== index);
        imageUrlsRef.current = nextImages.map(image => image.preview);

        setImages(nextImages);
        setMainImageIndex(current => {
            if (nextImages.length === 0) {
                return null;
            }

            if (current === index) {
                return 0;
            }

            if (current > index) {
                return current - 1;
            }

            return current;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsSaving(true);
            setError('');

            const gameId = await apiFetch('/api/admin/games/create', {
                method: 'POST',
                body: JSON.stringify({
                    name: form.name.trim(),
                    description: form.description.trim() || null,
                    price: Number(form.price) || 0,
                    releaseDate: form.releaseDate || null,
                    seriesId: form.seriesId ? Number(form.seriesId) : null,
                    genreIds: form.genreIds,
                    developerIds: form.developerIds,
                    publisherIds: form.publisherIds,
                    modeIds: form.modeIds,
                    engineIds: form.engineIds
                })
            });

            await Promise.all([
                saveRequirement(gameId, 'Minimum', form.minReq),
                saveRequirement(gameId, 'Recommended', form.recReq)
            ]);

            await uploadImages(gameId);

            onSave?.(gameId);
            onSaved?.(gameId);
            resetForm();
            onClose?.();
        } catch (err) {
            setError(err.message || 'Failed to save game');
        } finally {
            setIsSaving(false);
        }
    };

    const saveRequirement = async (gameId, requirementType, requirement) => {
        if (!hasRequirement(requirement)) {
            return;
        }

        await apiFetch('/api/admin/requirements/add', {
            method: 'POST',
            body: JSON.stringify({
                gameId: Number(gameId),
                requirementType,
                os: requirement.os.trim(),
                cpu: requirement.cpu.trim(),
                gpu: requirement.gpu.trim(),
                ramGb: Number(requirement.ramGb) || 0,
                storageGb: Number(requirement.storageGb) || 0,
                directX: requirement.directX.trim() || null
            })
        });
    };

    const uploadImages = async (gameId) => {
        for (const [index, image] of images.entries()) {
            const formData = new FormData();
            formData.append('gameId', gameId);
            formData.append('image', image.file);
            formData.append('isMain', String(index === mainImageIndex));

            await apiFetch('/api/admin/game-images', {
                method: 'POST',
                body: formData
            });
        }
    };

    const resetForm = () => {
        imageUrlsRef.current.forEach(preview => URL.revokeObjectURL(preview));
        imageUrlsRef.current = [];
        setForm(emptyForm);
        setNewFeatureNames({});
        setImages([]);
        setMainImageIndex(null);
        setError('');
    };

    const closeForm = () => {
        resetForm();
        onClose?.();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add Game</h2>
                    <button type="button" className="modal-close" onClick={closeForm} aria-label="Close">
                        x
                    </button>
                </div>

                {error && <div className="form-error">{error}</div>}
                {isLoading && <div className="form-message">Loading form data...</div>}

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h4>Basic Info</h4>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Title" required />
                        <input name="price" value={form.price} onChange={handleChange} type="number" min="0" step="0.01" placeholder="Price" />
                        <input name="releaseDate" value={form.releaseDate} onChange={handleChange} type="date" />
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
                    </div>

                    <div className="form-section">
                        <h4>Relations</h4>
                        {featureKeys.map(key => (
                            <FeatureSelect
                                key={key}
                                config={featureConfigs[key]}
                                options={options[key]}
                                value={form[featureConfigs[key].formKey]}
                                newValue={newFeatureNames[key] || ''}
                                disabled={isLoading || isSaving}
                                onChange={(event) => handleFeatureChange(key, event)}
                                onNewValueChange={(value) => setNewFeatureNames(prev => ({ ...prev, [key]: value }))}
                                onAdd={() => addFeature(key)}
                            />
                        ))}
                    </div>

                    <RequirementBlock
                        title="Minimum Requirements"
                        requirement={form.minReq}
                        onChange={(field, value) => handleRequirementChange('minReq', field, value)}
                    />

                    <RequirementBlock
                        title="Recommended Requirements"
                        requirement={form.recReq}
                        onChange={(field, value) => handleRequirementChange('recReq', field, value)}
                    />

                    <div className="form-section">
                        <h4>Images</h4>
                        <input name="images" type="file" multiple accept="image/*" onChange={handleImagesChange} />

                        {images.length > 0 && (
                            <div className="image-preview-grid">
                                {images.map((image, index) => (
                                    <div className="image-preview-item" key={`${image.file.name}-${index}`}>
                                        <img src={image.preview} alt={image.file.name} />
                                        <label>
                                            <input
                                                type="radio"
                                                name="mainImage"
                                                checked={mainImageIndex === index}
                                                onChange={() => setMainImageIndex(index)}
                                            />
                                            Main
                                        </label>
                                        <button type="button" className="image-remove" onClick={() => removeImage(index)}>
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="secondary" onClick={closeForm} disabled={isSaving}>
                            Cancel
                        </button>
                        <button type="submit" className="primary" disabled={isLoading || isSaving}>
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
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

function hasRequirement(requirement) {
    return Object.values(requirement).some(value => String(value || '').trim() !== '');
}
