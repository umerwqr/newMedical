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
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Import the icons
import Link from 'next/link'
const Name = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedMcq, setSelectedMcq] = useState(null);

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
        const response = await axios.post('/api/get_bookmarked_mcqs', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', user_id: user_Id, type: "bookmark" })
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

  const handleBookmarkNavigate = (mcq) => {

    cookie.set("bmMcq", JSON.stringify(mcq))


    setTimeout(() => {
      router.push("/items/name/bookmarks/bookmark_mcq");
    }, 2000);
  }
  const handleDeleteBookmark = (mcq) => {
    setSelectedMcq(mcq);
    setShowConfirmation(true);
  }

  const handleConfirmDelete = async () => {
    try {
      // Make API call to delete bookmark
      const response = await axios.post('/api/set_unbookmark_mcq', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', user_id: user_Id, mcq_id: selectedMcq.mcq_id });

      // Update bookmarked MCQs list (if necessary)

      // Close confirmation modal
      message.success("Bookmark Deleted Successfully")
      setShowConfirmation(false);
    } catch (err) {
      message.error("Failed to delete bookmark")
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false);
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
          {showConfirmation && (
            <div className="confirmation-modal-container">
              <div className="confirmation-modal">
                <div className="confirmation-content">
                  <p>Are you sure you want to delete this bookmark?</p>
                  <div className="confirmation-buttons">
                    <button onClick={handleCancelDelete}>Cancel</button>
                    <button onClick={handleConfirmDelete}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">
            <div className="flex flex-col items-center justify-center sm:w-[90%] w-full flex-wrap">

              {bookmarkMcqs.length !== 0 ? <div className='text-red-600'>YOUR BOOKMARKED MCQs ARE FOLLOWING: </div> : <> NO MCQ IS BOOKMARKED</>}
              <div className='flex flex-col items-start'>
                {bookmarkMcqs && bookmarkMcqs.map((mcq, index) => (
                  <>

                    <div
                      key={index}
                      className='flex justify-between shadow-sm hover:scale-[100.5%] transition:translate duration-200 hover:text-blue-400 flex-row p-4 m-1 rounded-lg cursor-pointer w-full items-center text-blue-700 border-2'>

                      <div 
                      className='flex ' 
                      onClick={() => handleBookmarkNavigate(mcq)}
>
                        <h1>Mcq_No:{index + 1})  _</h1>
                        <h1> {mcq.mcq.question}</h1>
                      </div>
                      <DeleteOutlined
                        onClick={() => handleDeleteBookmark(mcq)}
                        className='text-blue-500 hover:text-red-400' style={{ fontSize: '24px' }} />


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