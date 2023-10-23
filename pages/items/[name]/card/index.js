import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import React,{ useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import SubjectCard from '@/components/SubjectCard';
import SubjectCard1 from '@/components/SubjectCard1';
import Link from 'next/link'
import Loader from '@/components/Loader';
import axios from 'axios';

const Subject = () => {

    const router = useRouter();

    const [data, setData] = useState(null)
    const {program_id } =router.query
    const [loading, setLoading] = useState(true);

    useEffect((e) => {
        const getData = async () => {
            try {
                const response = await axios.post('/api/subjects_units', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us' })
                setLoading(false)
                if (response) {

                    setData(response.data.subjects)

                }

            } catch (error) {
                console.log(error)
            }

        }
        getData();
    }, [])
    console.log("data is :",data && data)
    const [optionName, setOptionName] = useState('');

   

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

                    <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">

                        {data&&data.map((subject, index) => (
                            <SubjectCard1
                                key={index}
                                subject={subject}
                                name={subject.name}
                                id={subject.id}
                                url={subject.image_url}
                                count={subject.flash_cards_count}
                                link={{pathname:`/items/name/card/cardSubjects?`,query:{subject:JSON.stringify(subject),index,program_id}}}

                            />
                        ))}
                    </div>
                </main>
                <WebFooter />
            </div>)}</>
    );
};

export default Subject