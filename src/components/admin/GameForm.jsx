//import React, { useState } from 'react';
import '../../css/admin/GameForm.css';

export default function GameForm(/*{ isOpen, onClose, onSave, initialData }*/) {

    // const isEdit = !!initialData;

    // const [form, setForm] = useState({
    //     title: initialData?.title || '',
    //     description: initialData?.description || '',
    //     price: initialData?.price || '',
    //     releaseDate: initialData?.releaseDate || '',
    //     genres: initialData?.genres || [],
    //     developerId: initialData?.developerId || '',
    //     publisherId: initialData?.publisherId || '',
    //     minReq: {
    //         cpu: initialData?.minReq?.cpu || '',
    //         ram: initialData?.minReq?.ram || '',
    //         gpu: initialData?.minReq?.gpu || ''
    //     },
    //     recReq: {
    //         cpu: initialData?.recReq?.cpu || '',
    //         ram: initialData?.recReq?.ram || '',
    //         gpu: initialData?.recReq?.gpu || ''
    //     },
    //     images: initialData?.images || []
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm(prev => ({ ...prev, [name]: value }));
    // };

    // const handleReqChange = (type, field, value) => {
    //     setForm(prev => ({
    //         ...prev,
    //         [type]: { ...prev[type], [field]: value }
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSave(form);
    // };

    // if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>'Add Game'</h2>

                <form className="modal-form">

                    {/* Basic Info */}
                    <input name="title" placeholder="Title" />
                    <input name="price" type="number" placeholder="Price" />
                    <input name="releaseDate" type="date" />
                    <textarea name="description" placeholder="Description" />

                    {/* Relations */}
                    <input name="seriesId" placeholder="Series ID" />
                    <input name="genreId" placeholder="Genre ID" />
                    <input name="developerId" placeholder="Developer ID" />
                    <input name="publisherId" placeholder="Publisher ID" />
                    <input name="engineId" placeholder="Engine ID" />
                    <input name="modeId" placeholder="Mode ID" />

                    {/* System Requirements */}
                    <div className="req-block">
                        <h4>Minimum Requirements</h4>
                        <input name="minReq.cpu" placeholder="CPU" />
                        <input name="minReq.ram" placeholder="RAM" />
                        <input name="minReq.gpu" placeholder="GPU" />
                        <input name="minReq.ramGb" placeholder="RAM_GB" />
                        <input name="minReq.storageGb" placeholder="StorageGb" />
                        <input name="minReq.directX" placeholder="DirectX" />
                    </div>

                    <div className="req-block">
                        <h4>Recommended Requirements</h4>
                        <input name="recReq.cpu" placeholder="CPU" />
                        <input name="recReq.ram" placeholder="RAM" />
                        <input name="recReq.gpu" placeholder="GPU" />
                        <input name="recReq.ramGb" placeholder="RAM_GB" />
                        <input name="recReq.storageGb" placeholder="StorageGb" />
                        <input name="recReq.directX" placeholder="DirectX" />
                    </div>

                    <h4>Images</h4>

                    {/* Images */}
                    <input name="images" type="file" multiple />

                    <div className="modal-actions">
                        <button type="button" className="secondary">Cancel</button>
                        <button type="submit" className="primary">Save</button>
                    </div>

                </form>
            </div>
        </div>
    );
}