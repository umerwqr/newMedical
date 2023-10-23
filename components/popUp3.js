import React, { useState } from 'react';
import { useRouter } from 'next/router';
const Popup2 = ({onResume ,show}) => {
    const router =useRouter()
    const handleExit=()=>{
        onResume(false)
    }
  

  return (
    <div className={`modal ${show?'show':'hide'}  `}>
      <div className="modal-content rounded-lg flex flex-col items-center justify-center">
        <h2 className='p-2 py-1 mb-0 font-bold '>Paused </h2>
        <h2 className='p-2 py-1 mb-12 '>Press Continue button to resume test </h2>
        {/* Add your form fields */}
      
        {/* Add other form fields */}
        <div className="modal-buttons flex justify-between ">

          <button className='px-3 border-2 mx-2 rounded-md hover:bg-slate-200' onClick={handleExit}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
