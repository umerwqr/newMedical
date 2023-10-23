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

    // const router2 = useRouter();
    // const {index, optionName, selectedData} = router2.query;
    // const [selectedDataObj, setSelectedDataObj] = useState({});
    // const [isLoading, setIsLoading] = useState(false);


    const [data, setData] = useState(null)

    useEffect((e) => {
        const getData = async () => {
            try {
                const response = await axios.post('/api/getGuide', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us' })
                if (response.data.error === false) {
                    setData(response.data.specialities)
                }

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
                    <div className="my-[3rem] h-full  w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                        {data && data.map((guide, index) => (
                            <GuideCard key={index} guide={guide} question={guide.speciality_designation}  />
                        ))}
                    </div>

                </div>
            </main>
            <WebFooter />
        </div>
    );
};

export default Guide;
