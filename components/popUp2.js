import React, { useState } from 'react';
import { useRouter } from 'next/router';
const Popup2 = ({show}) => {
    const router =useRouter()
    const handleExit=()=>{
router.push("/items/name/mcqs/unit")
    }
  

  return (
    <div className={`modal ${show?'show':'hide'}  `}>
      <div className="modal-content rounded-lg flex flex-col items-center justify-center">
        <h2 className='p-2 py-4 mb-5 '>Questions Ended </h2>
        {/* Add your form fields */}
      
        {/* Add other form fields */}
        <div className="modal-buttons flex justify-between ">

          <button className='px-3 border-2 mx-2 rounded-md hover:bg-slate-200' onClick={handleExit}>Exit</button>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
