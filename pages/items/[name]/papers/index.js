import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio, message } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import SubjectCard from '@/components/SubjectCard';
import Loader from '@/components/Loader';
import React from 'react';
import Link from 'next/link'
import axios from 'axios';
import { Slider } from 'antd';
import PpMedicine from '@/components/PpMedicine';

const Subject = () => {

  //   const { options } = router.query; 
  //   const [selectedOptions, setSelectedOptions] = useState([]);
  //   const [selectedData, setSelectedData] = useState({});

  const router = useRouter();

  const { program_id } = router.query;
  console.log("program ID: ", program_id)
  const [data, setData] = useState(null)
  const [isSelected, setIsSelected] = useState(-1);

  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState(null)
  useEffect((e) => {
    const getData = async () => {
      try {
        const response = await axios.post('/api/get_past_paper', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', program_id: program_id ? program_id : 1 })
        if (response.data.error === false) {
          setLoading(false)
          setPapers(response.data.papers)
        }
        else if (response.data.error === true) {
          setLoading(false)
          message.info("No Past Paper against this program")
        }

      } catch (error) {
        console.log(error)
      }

    }
    getData();
  }, [])
  const [sliderValue, setSliderValue] = React.useState(0);

  console.log(sliderValue)
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  const [sliderValue2, setSliderValue2] = React.useState(0);

  console.log(sliderValue2)
  const handleSliderChange2 = (value) => {
    setSliderValue2(value);
  };

  const [mcqsData, setMcqsData] = useState(null)

  const handleMcqs = (paperId, name, index) => {
    setIsSelected(index)
    setMcqsData({ paper_id: paperId, name: name })


  }
  console.log("mcq Data ", mcqsData)



  const [selectedRadio, setSelectedRadio] = useState('Speciality wise');
  const [optionName, setOptionName] = useState('');


  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };



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
              <h1 className="font-[700] text-[32px]">Select Past Paper</h1>
            </div>

            <div className="flex  w-[90%] w-full flex-wrap justify-center">

              {papers && papers.map((paper, index) => (


                <div
                  onClick={() => handleMcqs(paper.id, paper.custom_name, index)}
                  key={index}
                  className={` my-[.5rem] mx-[3rem] cursor-pointer  ${isSelected === index ? 'bg-[#D7392B]' : 'bg-[#1F5689]'} py-2 px-7 rounded-md `}
                  style={{ width: "300px" }} >
                  <a href='#slider'>
                    <p className='font-[500] text-[18px] text-white '>{paper.custom_name} </p>
                  </a>

                </div>
              ))}
              <div className="w-full px-[2rem] md:px-[6rem] lg:px-[15rem] my-12 ">

                <div className="bg-[#3F93FF12] text-black  border border-[#3F93FF2B] px-4 py-3 rounded-md w-full font-[500] text-[20px]">{sliderValue} MCQs of {mcqsData?.name} unit in {sliderValue2} minutes</div>

                <div className="w-full my-3" id='slider'>
                  <h1 className="font-[500] text-[20px] text-center mb-2">Total Questions</h1>
                  <div className="rounded-full bg-[#D7392B] py-[10px] w-full"></div>
                  <div className="w-full flex justify-between my-1"><span className="font-[500] text-[20px]">0</span><span className="font-[500] text-[20px]">200</span></div>
                  <Slider
                    min={0}
                    max={200}
                    value={sliderValue}
                    onChange={handleSliderChange}

                  />
                </div>
                <div className="w-full my-3">
                  <h1 className="font-[500] text-[20px] text-center mb-2">Total Time</h1>
                  <div className="rounded-full bg-[#D7392B] py-[10px] w-full"></div>
                  <div className="w-full flex justify-between my-1"><span className="font-[500] text-[20px]">0</span><span className="font-[500] text-[20px]">60</span></div>
                  <Slider
                    min={0}
                    max={60}
                    value={sliderValue2}
                    onChange={handleSliderChange2}

                  />

                </div>


              </div>
              <Link href={`/items/name/papers/paper?paper_id=${mcqsData?.paper_id}&sliderValue=${sliderValue}&sliderValue2=${sliderValue2}`}>
                <button disabled={isSelected === -1 || sliderValue === 0 || sliderValue2 === 0} className={`mt-8 border p-4 rounded ${isSelected === -1 || sliderValue === 0 || sliderValue2 === 0 ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-900 text-white hover:bg-blue-800 hover:text-white hover:scale-105 transition-transform hover:shadow-lg'}`}
                > Start Test</button>

              </Link>

            </div>
          </main>
          <WebFooter />
        </div>)}</>
  );
};

export default Subject