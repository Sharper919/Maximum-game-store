export default function RequirementBlock({ title, requirement, onChange }) {
    return (
        <div className="req-block">
            <h4>{title}</h4>
            <input value={requirement.os} onChange={(event) => onChange('os', event.target.value)} placeholder="OS" />
            <input value={requirement.cpu} onChange={(event) => onChange('cpu', event.target.value)} placeholder="CPU" />
            <input value={requirement.gpu} onChange={(event) => onChange('gpu', event.target.value)} placeholder="GPU" />
            <input value={requirement.ramGb} onChange={(event) => onChange('ramGb', event.target.value)} type="number" min="0" placeholder="RAM GB" />
            <input value={requirement.storageGb} onChange={(event) => onChange('storageGb', event.target.value)} type="number" min="0" placeholder="Storage GB" />
            <input value={requirement.directX} onChange={(event) => onChange('directX', event.target.value)} placeholder="DirectX" />
        </div>
    );
}