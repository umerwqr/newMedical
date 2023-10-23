import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import cookie from "js-cookie"
import { useRouter } from 'next/router';

function SubjectCard1({ subject,name,id,url,count, link,programId }) {
  console.log("here subject")
  const router=useRouter()
  
    const handleUnits=()=>{
    cookie.set("unitId", JSON.stringify(id));

    setTimeout(() => {
      router.push({
        pathname: '/items/name/card/cardSubjects?',
        query: { program_id: programId }
      });    }, 3000);

  }
  
  return (
    <div onClick={handleUnits} >

    
   
    
    <div className={` rounded-lg px-4 py-2 m-3 hover:scale-105 transition-transform w-[200px] md:w-[300px]  shadow-md hover:shadow-lg cursor-pointer flex flex-col items-center  `} style={{background: `#96D4D4`,marginTop:"30px"}}>
      <div className="rounded-full picShadow  bg-white md:w-16 md:h-16 w-12 h-12 flex items-center justify-center mb-0 mt-[-2.2rem] ">
        <Image src={url} alt="Option Image" width={100} height={100} />
      </div>
      <div className="fontPop flex py-0 flex-col items-center">
        <p className="font-[600] py-0 text-sm md:text-lg lg:text-xl xl:text-2xl ">{name}</p> 
        <p className="text-sm md:text-lg lg:text-lg xl:text-lg">{`${count} `}</p>
      </div>
    </div>
    </div>
  );
}

export default SubjectCard1;
