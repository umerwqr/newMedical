import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import React,{ useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import SubjectCard from '@/components/SubjectCard';
import Link from 'next/link'
import Loader from '@/components/Loader';
import axios from 'axios';

const Subject = () => {

    const router = useRouter();

    const {image_url} =router.query;
    const [loading, setLoading] = useState(false);

    

    const handleBack=()=>{
        
        router.push("/items/name/mcqs/unit/quiz")
    }
    return (<>
        {loading ? (
            <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", }}>


                <Loader />
            </div>
        ) : (
            <div className="">
                <WebHeader />
                <main className="my-[6rem] w-full h-full xxl:h-[100vh] flex flex-col items-center  xl:justify-start">
                    <div className="text-center w-full">
                        <h1 className="font-[700] text-[32px]">Select Subject</h1>
                    </div>

                    <div className="my-[3rem]   flex flex-col justify-center w-full  items-center  flex-wrap px-6">

                       <img className='w-[70%] ' src={image_url}/>
                       <button className='p-4 bg-blue-800 text-white rounded-md m-4 ' onClick={handleBack}>Back</button>
                    </div>
                </main>
                <WebFooter />
            </div>)}</>
    );
};

export default Subject