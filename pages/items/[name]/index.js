import WebFooter from '@/components/WebFooter';
import WebHeader from '@/components/WebHeader';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Pagination, Radio } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Data from '@/data/Data';
import ItemCard from '@/components/ItemCard';
import React from 'react';
import Link from 'next/link'
import axios from 'axios';
import cookie from "js-cookie"
import Loader from '@/components/Loader';
const Name = () => {

  const router = useRouter();
  const { options, program_id } = router.query;
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('PREP Mode');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [optionName, setOptionName] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  console.log("filtered program:", filteredOptions && filteredOptions)

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const pageSize = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentItems = filteredOptions && filteredOptions.slice(startIndex, endIndex);
  const findOptionsByName = (name) => {
    const foundOptions = Data.find((item) => true);
    if (foundOptions) {
      setSelectedData(foundOptions)
      setSelectedOptions(foundOptions.options);
      //setFilteredOptions(foundOptions.options);
    } else {
      setSelectedOptions([]);
      setSelectedData({});
      // setFilteredOptions([]);
    }
  };

  useEffect(() => {
    if (options) {
      const parsedOptions = JSON.parse(options);
      findOptionsByName(parsedOptions);
    }
  }, [options]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    // if (searchText) {
    //   const filtered = selectedOptions.filter(option => option.name.toLowerCase().includes(searchText.toLowerCase()));
    //   setFilteredOptions(filtered);
    // } else {
    //   setFilteredOptions(selectedOptions);
    // }
    const fetchData = async () => {
      if (searchText !== '') {
        try {
          const response = await axios.post("/api/search_mcqs", { key: "Vx0cbjkzfQpyTObY8vfqgN1us", wordSearch: search.toLowerCase() });
          setLoading2(false)
          setFilteredOptions(response.data.mcqs);


        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();

  }, [search]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearch('')
    setLoading(false)

  };

  const handleSearchButton = () => {

    setLoading2(true)
    if (searchText === "") {
      setLoading2(false)
    }
    setSearch(searchText)
  }

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  function getOptionText(optionName) {

    switch (optionName) {
      case 'Subject MCQs':
        return 'mcqs';
      case 'Guidlines':
        return 'guideCard';
      case 'Past Papers':
        return 'papers';
      case 'Mock Exams':
        return 'mock';
      case 'Flash Cards':
        return 'card';
      case 'Notes':
        return 'notes';
      case 'Bookmarked':
        return 'bookmarks';
      case 'Tutorials':
        return 'tutorials';
      case 'MCQs_Discussion':
        return 'Discussion';
      case 'Join_Us':
        return 'join_us';
      case 'Mentors':
        return 'mentors';
      default:
        return '';
    }

  }

  const handleMcq = (mcq) => {

    cookie.set("searchMcq", JSON.stringify(mcq))


    setTimeout(() => {
      router.push("/items/name/searchMcq");
    }, 3000);

  }
  return (
    <>
      {loading ? (
        <div style={{ width: "100%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center", }} >


          <Loader />
        </div>
      ) : (
        <div className="">
          <WebHeader />

          <main className="w-full h-full xxl:h-[100vh] flex items-center xl:items-start justify-center">
            <div className=" py-[6rem] px-4   w-full">
              <div className="w-full   flex flex-col items-center ">
                <div className="md:w-[45%] w-full">
                  <div className="p-3 rounded-sm bg-white relative flex justify-center items-center mb-4 w-full max-w-[96%]" style={{ marginTop: '-190px' }}>
                    <Image
                      src="/images/search.svg"
                      alt="Search Icon"
                      width={13}
                      height={13}
                      className="absolute left-4"
                    />
                    <Input
                      value={searchText}
                      onChange={handleSearchChange}
                      placeholder="Search here"
                      className="w-full px-10 py-2 bg-white border-none"
                    />
                    {searchText && (
                      <Image
                        src="/images/cross.svg"
                        width={10}
                        height={10}
                        className="cursor-pointer absolute right-[87px]"
                        onClick={handleClearSearch}
                        alt="crossIcon"
                      />
                    )}
                    <button
                      onClick={handleSearchButton}
                      className='border-2 p-[6px] rounded-md bg-blue-900 duration-100 text-white hover:bg-blue-800'>
                      Search
                    </button>
                  </div>
                  <div className="flex space-x-4 mt-9 items-center justify-center">
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
              {
                loading2 && <> <Loader /></>
              }
              {!search &&
                <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6" >
                  <div className="flex  sm:w-[90%] w-full flex-wrap justify-center" >
                    {selectedOptions.map((option, index) => {
                      const optionName = getOptionText(option.name);
                      return (
                        <Link
                          href={{
                            pathname: `/items/name/${optionName}`,
                            query: {

                              program_id: program_id
                            }
                          }}
                          key={index}
                        >
                          <ItemCard
                            option={option}
                            img={`/images/${option.name}.jpg`}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              }
              <div className='flex flex-col items-center justify-center'>
                {search && currentItems ? currentItems?.map((item, index) => (
                  <div key={item?.id}>
                    <div
                      onClick={() => { handleMcq(item) }}
                      className="bg-white items-center cursor-pointer w-full sm:w-[85%] lg:w-[900px] rounded-lg text-black py-1 hover:scale-[101.3%] transition-transform duration-150 px-[1.5rem] my-[1rem] border border-black-100  shadow-md">
                      <div className="flex  items-center justify-center w-full space-x-6 font-bold">
                        Question # {index + 1}
                      </div>
                      <div className="my-2  md:mx-[2rem] font-[500] text-[18px]">
                        <>{item?.question}</>
                      </div>
                    </div>

                  </div>
                )):<div>
                  {search && <>No Mcq Matched !</>}
                  </div>}
                <div className='flex flex-col items-center justify-center'>
                  {search && (
                    <Pagination
                      className='mt-4'
                      defaultCurrent={1}
                      onChange={handlePageChange}
                      total={filteredOptions && filteredOptions?.length}
                      responsive
                    />
                  )}
                </div>
              </div>
            </div>
          </main>

          <WebFooter />
        </div>)}
    </>
  );
};

export default Name;