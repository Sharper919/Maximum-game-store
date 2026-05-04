export default function FeatureSelect({ config, options, value, newValue, disabled, onChange, onNewValueChange, onAdd }) {
    const selectValue = config.multiple ? value.map(String) : (value ? String(value) : '');

    return (
        <div className="feature-field">
            <label>{config.label}</label>
            <select multiple={config.multiple} value={selectValue} onChange={onChange} disabled={disabled}>
                {!config.multiple && <option value="">No series</option>}
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            <div className="add-feature-row">
                <input
                    value={newValue}
                    onChange={(event) => onNewValueChange(event.target.value)}
                    placeholder={`New ${config.label.toLowerCase()}`}
                    disabled={disabled}
                />
                <button type="button" onClick={onAdd} disabled={disabled || !newValue.trim()}>
                    Add
                </button>
            </div>
        </div>
    );
}