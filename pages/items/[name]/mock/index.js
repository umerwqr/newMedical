import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import axios from 'axios';
import cookie from "js-cookie"
import Data from '@/data/Data';
import SubjectCard from '@/components/SubjectCard';
import React from 'react';
import Link from 'next/link'
import Loader from '@/components/Loader';


const Subject = () => {

    const router = useRouter();
    const { program_id } = router.query
    //   const { options } = router.query; 
    //   const [selectedOptions, setSelectedOptions] = useState([]);
    //   const [selectedData, setSelectedData] = useState({});

    const [data, setData] = useState(null)

    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.post("/api/subjects_units", {
              key: "Vx0cbjkzfQpyTObY8vfqgN1us",
            });
            setLoading(false);
            
            // Sort the subjects alphabetically
            const sortedData = response.data.subjects.sort((a, b) => a.name.localeCompare(b.name));
            setData(sortedData);
          } catch (error) {
            console.log(error);
          }
        };
        getData();
      }, []);
    const [optionName, setOptionName] = useState('');
   console.log("data is : ",data && data)

    //   const findOptionsByName = (name) => {
    //     const foundOptions = Data.find((item) => item.name === name);
    //     if (foundOptions) {
    //       setSelectedData(foundOptions)
    //       setSelectedOptions(foundOptions.options);
    //     } else {
    //       setSelectedOptions([]);
    //       setSelectedData({}); 
    //     }
    //   };

    //   console.log(optionName)

    //   useEffect(() => {

    //     if (options) {
    //       const parsedOptions = JSON.parse(options);
    //       findOptionsByName(parsedOptions);

    //     }
    //   });

    const handleMockSubject = (subject) => {

           
    cookie.set("unitId", JSON.stringify(subject.id));
    cookie.set("subjectId", JSON.stringify(subject.id));

    setTimeout(() => {
      router.push({
        pathname: '/items/name/mock/unit',
        query: { program_id: program_id }
      });    }, 3000);

    }

    return (
        <>
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

                            {data && data.map((subject, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleMockSubject(subject)}
                                    className={` rounded-lg px-4 py-2 m-3 hover:scale-105 transition-transform w-[200px] md:w-[300px]  shadow-md hover:shadow-lg cursor-pointer flex flex-col items-center  `} style={{ background: `#96D4D4`, marginTop: "30px" }}>
                                    <div className="rounded-full picShadow  bg-white md:w-16 md:h-16 w-12 h-12 flex items-center justify-center mb-0 mt-[-2.2rem] ">
                                        <Image src={subject.image_url} alt="Option Image" width={100} height={100} />
                                    </div>
                                    <div className="fontPop flex py-0 flex-col items-center">
                                        <p className="font-[600] py-0 text-sm md:text-lg lg:text-xl xl:text-2xl ">{subject.name}</p>
                                        <p className="text-sm md:text-lg lg:text-lg xl:text-lg">{`${subject.mcqs_count} `}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                    <WebFooter />
                </div>)}</>
    );
};

export default Subject