import WebFooter from "@/components/WebFooter";
import WebHeader from "@/components/WebHeader";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Input, Radio } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Data from "@/data/Data";
import SubjectCard from "@/components/SubjectCard";
import React from "react";
import Link from "next/link";
import axios from "axios";
import cookie from "js-cookie"
import { Slider } from "antd";
import Loader from "@/components/Loader";
export default function Unit() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [sliderValue, setSliderValue] = React.useState(0);
  const [sliderValue3, setSliderValue3] = React.useState(2014);

  const { program_id } = router.query;

  // const subjectObject = subject ? JSON.parse(subject) : null;
  const [totalQuestionsRange, setTotalQuestionsRange] = useState([0, 0]); // Set initial range to [0, 0]

  console.log("total::",totalQuestionsRange);

  const handleTotalQuestionsRangeChange = (value) => {
    setTotalQuestionsRange(value);
    const [start, end] = value;
    setSliderValue(end - start); // Adjust sliderValue based on the second pointer
  };

  const [yearRange, setYearRange] = useState([2017, 2020]);

  console.log(yearRange);

  const handleYearRangeChange = (value) => {
    setYearRange(value);
  };

  const [mcqsData, setMcqsData] = useState(null);
  const [topics, setTopics] = useState(null);

  const unitCookie = cookie.get("unitId")

  const [unitId, setUnitId] = useState(null)
  useEffect(() => {
    if (unitCookie) {
      setUnitId(JSON.parse(unitCookie))

    }
  }, [unitCookie]);
  console.log("impooooortant", unitId && unitId )

  const [data, setData] = useState(null);
  console.log("UNITS data", data);


  useEffect((e) => {
    const getData = async () => {
      try {
        const response = await axios.post("/api/subjects_units", {
          key: "Vx0cbjkzfQpyTObY8vfqgN1us",


        });
        setLoading(false);
        console.log(response.data)

        setData(response.data.subjects);

      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  console.log("dddddddaaaaaTTTTTTaaa:", data && data)

  const filteredObject = data && data.find(item => item.id === unitId && unitId);



  const unitClicked = (index, sId, uId, name, pId, topics, count) => {

    setUnitLength(0)
    setIsSelected(index);
    setMcqsData({ subject_id: sId, unit_id: uId, name: name, program_id: pId, count: count });

    setTopics(topics);
  };
  console.log("mcq Data ", mcqsData);

  const [check1, setCheck1] = useState(false)
  const handleTopicClick = (id) => {
    setMcqsData({ ...mcqsData, topic_id: id });
    setCheck1(true)
    // if(id===""){
    //   setUnitLength(0)
    // }
  };

  const [unitLength, setUnitLength] = useState(0)
  useEffect(() => {

    const topic = async () => {
      try {
        if (mcqsData?.count) {
          const response = await axios.post('/api/get_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', topic_id: mcqsData?.topic_id, unit_id: mcqsData?.unit_id, program_id: mcqsData?.program_id, subject_id: mcqsData?.subject_id, offset: 0, pagination: mcqsData?.count, mode: "prep" })
          console.log("ruspunse:", response)
          console.log("LLLLLLLength::::::::::::", response.data.mcqs.length)
          setTotalQuestionsRange([0,response.data.mcqs.length])
          setSliderValue(response.data.mcqs.length)

          if (mcqsData?.topic_id === "") {
            setUnitLength(0)
          }
          else {

            setUnitLength(response.data.mcqs.length)
          }
        }
        else {

        }

      }
      catch (err) {
        console.log(err)
      }
    }

    topic()


  }, [mcqsData?.topic_id, mcqsData?.count])
  const [isSelected, setIsSelected] = useState(-1);


  console.log(sliderValue);
  const handleSliderChange = (value) => {
    setSliderValue(value);

  };
  const handleSliderChange3 = (value) => {
    setSliderValue3(value);

  };
  const [sliderValue2, setSliderValue2] = React.useState(0);

  console.log(sliderValue2);
  const handleSliderChange2 = (value) => {
    setSliderValue2(value);
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  cookie.remove("mcqData")
  const handleStart = (mcqsData, sliderValue, sliderValue2, yearRange, sub_id) => {

    cookie.set("mcqData", JSON.stringify(mcqsData))
    cookie.set("sliderValue", sliderValue)
    cookie.set("sliderValue2", sliderValue2)
    cookie.set("yearRange", yearRange)
    cookie.set("sub_id", sub_id)
    cookie.set("program_id", program_id)

    setTimeout(() => {
      router.push("/items/name/mock/unit/MockMcqs")
    }, 3000);


  }
  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="">
          <WebHeader />
          <main className="my-[6rem] w-full h-full xxl:h-[100vh] flex flex-col items-center  xl:justify-start">
            <div className="text-center w-full">
              <h1 className="font-[700] text-[32px]">Select Unit For MCQs</h1>
            </div>
            <div className="my-[3rem] md:px-[6rem]  w-full  flex-wrap  md:px-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredObject?.units.length!==0 ? filteredObject?.units?.map((each, index) => (
                <div
                  key={index}
                  className={`cursor-pointer w-[90%] text-center my-[.5rem] py-5 md:w-full  mx-auto md:mx-0 ${isSelected === index ? "bg-[#D7392B]" : "bg-[#1F5689]"
                    } md:py-2 md:px-7 rounded-lg`}
                  onClick={() =>
                    unitClicked(
                      index,
                      each.subject_id,
                      each.id,
                      each.name,
                      program_id,
                      each._topics,
                      each.mcqs_count


                    )
                  }
                >
                  <p className={`md:font-[600] font-[400] text-[16px] md:text-[24px] text-white`}>
                    {each.name}
                  </p>
                  {/* Add content here */}
                </div>
              )):<div className="text-start md:ml-40 ml-10 w-[100%]  flex justify-center"> NO UNIT AVAILABLE, Direct jump into the MCQs.</div>}
            </div>

            <div className="w-full px-[2rem] md:px-[6rem] lg:px-[15rem] ">
              <div className="my-12 ">
                <select
                  onChange={(e) => handleTopicClick(e.target.value)}
                  className="cursor-pointer block appearance-none w-full border py-4 bg-blue-100 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">
                    ALL MCQs of this Unit
                  </option>
                  {topics &&
                    topics.map((topic) => (
                      <option key={topic.topic_id} value={topic.topic_id}>
                        {topic?.topic?.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="bg-[#3F93FF12] text-black  border border-[#3F93FF2B] px-4 py-3 rounded-md w-full font-[500] text-[20px]">
                {sliderValue} MCQs of {mcqsData?.name} unit in {sliderValue2}{" "}
                minutes
              </div>

              <div className="w-full my-3 mt-6">
                <h1 className="font-[500] text-[20px] text-center ">Total Questions Range</h1>
                <div className="w-full flex justify-between my-1">
                  <span className="font-[500] text-[20px]">{totalQuestionsRange[0]}</span>
                  <span className="font-[500] text-[20px]">{totalQuestionsRange[1]}</span>
                </div>
                <Slider
                  min={0}
                  max={mcqsData?.count || 100} // Change max value as per your requirement
                  value={totalQuestionsRange}
                  onChange={handleTotalQuestionsRangeChange}
                  range
                />
              </div>
              <div className="w-full my-3 mt-6">
                <h1 className="font-[500] text-[20px] text-center ">Select Year Range</h1>
                <div className="w-full flex justify-between my-1">
                  <span className="font-[500] text-[20px]">{yearRange[0]}</span>
                  <span className="font-[500] text-[20px]">{yearRange[1]}</span>
                </div>
                <Slider
                  min={2014}
                  max={2023}
                  value={yearRange}
                  onChange={handleYearRangeChange}
                  range
                />
              </div>
              <div className="w-full  mt-9">
                <h1 className="font-[500] my-3 text-[20px] text-center mb-0">
                  Total Time
                </h1>
                {/* <div className="rounded-full bg-[#D7392B] py-[10px] w-full"></div> */}
                <div className="w-full flex justify-between my-0">
                  <span className="font-[500] text-[20px]">0</span>
                  <span className="font-[500] text-[20px]">180</span>
                </div>
                <Slider
                  min={0}
                  max={180}
                  value={sliderValue2}
                  onChange={handleSliderChange2}
                />
              </div>
            </div>


            <button
              onClick={() => handleStart(mcqsData, sliderValue, sliderValue2, yearRange, data && data[0]?.units[0]?.subject_id)}
              disabled={
                sliderValue === 0 || sliderValue2 === 0
              }
              className={`mt-8 w-72 text-3xl border p-4 rounded ${sliderValue === 0 || sliderValue2 === 0
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800 hover:text-white hover:scale-105 transition-transform hover:shadow-lg"
                }`}
            >
              {" "}
              Start Test
            </button>

          </main>
          <WebFooter />
        </div>
      )}
    </>
  );
}
