import React, { useState } from 'react';

function GuideCard({ key, question }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const isOdd = key % 2 === 0;

  // Remove <p> and </p> tags from question
  const cleanedQuestion = question.replace(/<\/?p>/g, '');

  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="flip-card-inner ">
        <div className={`flip-card-front ${isOdd ? 'bg-amber-300' : 'bg-rose-400'} rounded-md cursor-pointer flex justify-center items-center`}>
          <p>{cleanedQuestion.split('☛')[0]}</p>
        </div>
        <div className={`flip-card-back ${isOdd ? 'bg-rose-400' : 'bg-amber-300'} rounded-md cursor-pointer flex justify-center items-center`}>
          <p>{cleanedQuestion.split('☛')[1]}</p>
        </div>
      </div>
    </div>
  );
}

export default GuideCard;
