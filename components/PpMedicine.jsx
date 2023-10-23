import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 

function PpMedicine({ subject, link }) {
  console.log("here subject")
 console.log("here ", subject)
  return (
    <div className={` rounded-lg px-4 py-5 m-4 sm:w-[300px]  flex flex-col items-center`} style={{background: `#96D4D4`}}>
      <div className="rounded-full picShadow bg-white w-16 h-16 flex items-center justify-center mb-2 mt-[-2.6rem]">
        <Image src={subject?.image_url} alt="Option Image" width={30} height={30} />
      </div>
      <div className="fontPop flex flex-col items-center">
        <p className="font-[600] text-[24px] ">{subject.name}</p> 
        <p className="">{`${subject.mcqs_count} count covering ${subject.name}`}</p>
        <Link href={link} className="py-2 my-3 px-3 bg-[#268FDA] text-white rounded-md">Start Test</Link>
      </div>
    </div>
  );
}

export default PpMedicine;
