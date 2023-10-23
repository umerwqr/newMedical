import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import GuideCard from '@/components/GuideCard';
import React from 'react';
import axios from 'axios';

const Guide = () => {

    const router2 = useRouter();
    const { speciality_id, program_id } = router2.query;
   


    const [data, setData] = useState(null)

    useEffect((e) => {
        const getData = async () => {
            try {
                const response = await axios.post('/api/get_guidelines', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', speciality: speciality_id, programId: program_id })
                console.log("Responnnnceee : ", response)
                setData(response.data.med)

            } catch (error) {
                console.log(error)
            }

        }
        getData();
    }, [])





    return (
        <div>
            <WebHeader />
            <main className="w-full h-full flex items-center justify-center">
                <div className=" py-[6rem] px-2 sm:px-4 flex flex-col items-center">
                    <div className="text-center">
                        <h1 className="font-[700] text-[32px]">Guidlines</h1>
                        <p className="text-[#777777]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <div className="my-[3rem] h-full  w-full grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
                        {data && data.length > 0 ? (
                            data.map((guide, index) => (
                                <div className="flex p-4 justify-center items-center bg-white sm:flex-row flex-col" key={index}>
                                    <div className="py-4 justify-center items-center flex flex-col items-center ">
                                        <h1 className='text-5xl font-bold mb-10'>
                                            {guide.title}
                                        </h1>
                                        <div className='h-[100%] flex items-center justify-center rounded-lg px-10 Font-[500px] bg-gray-200'>
                                            <p className="ml-1">
                                                <div dangerouslySetInnerHTML={{ __html: guide.description }} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-screen">
                                <p className="text-2xl">No data available</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
            <WebFooter />
        </div>
    );
};

export default Guide;
