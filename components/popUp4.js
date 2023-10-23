import React, { useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;

const Popup4 = ({ showModal, setShowModal, onPush, }) => {
    const [formData, setFormData] = useState({
        place_name: "",
        designation: "",
        period: "",
        period_unit: "Year"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onPush(formData);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className={`modal ${showModal ? 'show' : ''}`}>
            <div className="modal-content rounded-lg">
                <h2 className='p-2'>Add Experience </h2>
                {/* Add your form fields */}
                <div className='flex flex-col'>
                    <input
                        className='border-2 my-2 text-xl p-2'
                        type="text"
                        placeholder='Enter Work place'
                        name="place_name"
                        value={formData.place_name}
                        onChange={handleInputChange}
                    />
                    <input
                        className='border-2 my-2 text-xl p-2 '  // Use textarea here
                        placeholder='Enter Designation'
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                    />
                    <input
                        className='border-2 my-2 text-xl p-2 '  // Use textarea here
                        placeholder='Enter Time Period'
                        name="period"
                        type='number'
                        value={formData.period}
                        onChange={handleInputChange}
                    />
                    <Select
                        className='border-2 my-2 text-xl p-2 '  // Use textarea here
                        placeholder="Enter Period Unit"
                        name="period_unit"
                        value={formData.period_unit}
                        onChange={(value) => setFormData({ ...formData, period_unit: value })} // Changed city_id to programs
                    >
                        <Option value="Year">Year</Option>
                        <Option value="Month">Month</Option>
                       
                    </Select>
                </div>
                {/* Add other form fields */}
                <div className="modal-buttons">
                    <button className=' hover:bg-slate-200' onClick={handleSubmit}>Submit</button>
                    <button className='ml-10 hover:bg-slate-200' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Popup4;
