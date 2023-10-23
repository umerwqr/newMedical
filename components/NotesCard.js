import React, { useState } from 'react';

const Modal = ({ showModal, setShowModal, onSubmit, user_id, mcq_id }) => {
  const [formData, setFormData] = useState({
    user_id: user_id,
    mcq_id: mcq_id,
    note_heading: "",
    note_description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content rounded-lg">
        <h2 className='p-2'>Enter Note </h2>
        {/* Add your form fields */}
        <div className='flex flex-col'>
          <input
            className='border-2 my-2 text-xl p-2'
            type="text"
            placeholder='Enter Note Heading'
            name="note_heading"
            value={formData.note_heading}
            onChange={handleInputChange}
          />
          <textarea
            className='border-2 my-2 text-xl p-2 h-32'  // Use textarea here
            placeholder='Enter Note Description'
            name="note_description"
            value={formData.note_description}
            onChange={handleInputChange}
          />
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

export default Modal;
