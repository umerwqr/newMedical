import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Radio, message } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import ItemCard from '@/components/ItemCard.jsx';
import React from 'react';
import cookie from "js-cookie"
import axios from 'axios';
import Loader from '@/components/Loader';
import Link from 'next/link'
const Name = () => {

  const router = useRouter();
  const { options } = router.query;
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('PREP Mode');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [optionName, setOptionName] = useState('');
  const [loading, setLoading] = useState(true)
  const findOptionsByName = (name) => {
    const foundOptions = Data.find((item) => item.name === name);
    if (foundOptions) {
      setSelectedData(foundOptions)
      setSelectedOptions(foundOptions.options);
    } else {
      setSelectedOptions([]);
      setSelectedData({});
    }
  };
  
  const userCookie = cookie.get("user")
  const user_Id = cookie.get("userId")

  const [userObject, setUserObject] = useState(null)
  useEffect(() => {
    if (userCookie) {
      setUserObject(JSON.parse(userCookie))

    }
  }, [userCookie]);

  console.log(optionName)

  useEffect(() => {

    if (options) {
      const parsedOptions = JSON.parse(options);
      findOptionsByName(parsedOptions);

    }
  });

  const [bookmarkMcqs, setBookmarkMcqs] = useState(null)
  useEffect(() => {

    const get_bookmarked_mcqs = async () => {
      try {
        const response = await axios.post('/api/get_bookmarked_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', user_id: user_Id, type: "notes" })
        console.log(response)
        setBookmarkMcqs(response.data.mcqs)
        setLoading(false)


      }
      catch (err) {
        console.log(err)

      }

    }

    get_bookmarked_mcqs()
  }, [bookmarkMcqs])
  console.log("BookMarked Mcqs  :::::", bookmarkMcqs && bookmarkMcqs)

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleBookmarkNavigate=async(mcq)=>{

    await cookie.set("noteMcq",JSON.stringify(mcq))


    setTimeout(() => {
      router.push("/items/name/notes/McqsWithNotes");
    }, 3000);
  }


  return (

    <div className="">
      <WebHeader />
      <main className="w-full h-full xxl:h-[100vh] flex items-center xl:items-start justify-center">
        {loading ? <div className='h-[400px] flex justify-center items-center'> <Loader /></div> : <> <div className=" py-[6rem] px-4   w-full">
          <div className="w-full   flex flex-col items-center ">
            <div className="md:w-[45%] w-full">

              <div className="relative  w-full flex items-center justify-between mb-4">
                <Image
                  src="/images/search.svg"
                  alt="Search Icon"
                  width={13}
                  height={13}
                  className="absolute left-3"
                />
                <Input
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Search here"
                  className="w-full px-10 py-2 bg-[#268FDA0D] border border-[#0000002B]"
                />
                {searchText && (
                  <Image
                    src="/images/cross.svg"
                    width={10}
                    height={10}
                    className="cursor-pointer absolute right-3"
                    onClick={handleClearSearch}
                    alt="crossIcon"
                  />
                )}
              </div>
              <div className="flex space-x-4">
                <Radio.Group onChange={handleRadioChange} value={selectedRadio}>
                  <Radio
                    value="PREP Mode"
                    className={selectedRadio === 'PREP Mode' ? 'red-radio ' : ''}
                  >
                    PREP Mode
                  </Radio>
                  <Radio
                    value="Exam Mode"
                    className={selectedRadio === 'Exam Mode' ? 'red-radio' : ''}
                  >
                    Exam Mode
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">
            <div className="flex flex-col items-center justify-center sm:w-[90%] w-full flex-wrap">

              {bookmarkMcqs.length !==0 ? <div className='text-red-600'>YOU ADDED NOTES WITH THE FOLLOWING MCQs: </div> : <> NO NOTE ADDED</>}
              <div className='flex flex-col items-start'>
                {bookmarkMcqs && bookmarkMcqs.map((mcq, index) => (
                <>

                  <div 
                  key={index}
                  onClick={()=>handleBookmarkNavigate(mcq)}
                  className='flex shadow-sm hover:scale-[101.3%] transition:translate duration-200 hover:text-red-600 flex-row p-4 m-1 rounded-lg cursor-pointer w-full items-center text-blue-800 border-2'>

                    <h1>Mcq No:{index + 1})  _</h1>
                    <h1> {mcq.mcq.question}</h1>


                  </div>
                  </>
                ))}
              </div>


            </div>
          </div>
        </div>  </>}

      </main>
      <WebFooter />
    </div>
  );
};

export default Name;