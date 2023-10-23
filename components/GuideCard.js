import React from 'react';
import Link from 'next/link'
import Image from 'next/image'


function GuideCard({ guide, question, id, program_id }) {
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length <= maxWords) {
      return text;
    }
    const truncatedText = words.slice(0, maxWords).join(' ');
    return `${truncatedText} ...`;
  };

  return (
    <div className="flex p-4 justify-center  bg-white sm:flex-row flex-col ">

      <div className="py-4 justify-center items-center flex flex-col items-center sm:items-start">

        <Link
          href={{
            pathname: `/items/name/guide/guideCard`,
            query: {
              program_id:program_id,

              speciality_id:id
            }
          }}>

          <div className=' w-60 h-40 flex items-center justify-center rounded-lg px-10 Font-[500px] bg-blue-900 text-white'>
            <p className=" ml-1 ">
              <div dangerouslySetInnerHTML={{ __html: question }} /></p></div>
        </Link>
      </div>
    </div>
  );
}

export default GuideCard;
