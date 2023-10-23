import WebFooter from "@/components/WebFooter";
import WebHeader from "@/components/WebHeader";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Pagination, Radio } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import Data from "@/data/Data";
import Link from "next/link";
import axios from "axios";
import cookie from "js-cookie";
import { message } from 'antd';
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from 'next-auth/react'

import Loader from "../../components/Loader";

const Home = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("brands");
  const [programs, setPrograms] = useState(null);
  const [filteredPrograms, setFilteredPrograms] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true);


  console.log("filtered program:", filteredPrograms && filteredPrograms);
  const pageSize = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentItems =
    filteredPrograms && filteredPrograms.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/get_CoreData", {
          key: "Vx0cbjkzfQpyTObY8vfqgN1us",
        });
        setPrograms(response.data.programs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const userr = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await axios.post('/api/login_social', { key: 'Vx0cbjkzfQpyTObY8vfqgN1us', text: session?.user.email , id:"12341234" });
  //       cookie.set("user", JSON.stringify(response))
  //       console.log("hurrah : ",response)



  //       if (response.status === 200) {
  //         setLoading(false);
  //         auth.login(response);
  //         updateUser(response.data);

  //         const serializedUserObject = JSON.stringify(response.data);

  //         cookie.set("userObject", serializedUserObject)

  //         message.success('Logged in successfully');
  //         setTimeout(() => {
  //           router.push('/');
  //         }, 2000);
  //       } else {
  //         setLoginFailed(true); // Set loginFailed state to true on failed login
  //         message.error('Invalid email or password');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       message.error('Invalid email or password');

  //     }
  //   }

  //   userr()

  // }, [])


  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (searchText !== '') {
        try {
          const response = await axios.post("/api/search_mcqs", { key: "Vx0cbjkzfQpyTObY8vfqgN1us", wordSearch: search.toLowerCase() });
          setLoading2(false)
          setFilteredPrograms(response.data.mcqs);


        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [search, programs]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearch('')

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
  const handleMcq = (mcq) => {
    cookie.set("searchMcq", JSON.stringify(mcq));

    setTimeout(() => {
      router.push("/items/name/searchMcq");
    }, 3000);
  };

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
        <div>
          <WebHeader />
          <main className="w-full flex items-center justify-center" >
            <div className="p-6 w-full max-w-screen-lg py-10">
              <div className="flex flex-col items-center mb-4">
                <div className=" p-3 rounded-sm bg-white relative flex items-center mb-4 w-full max-w-[600px] " style={{ marginTop: '-134px' }} >
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
                    className="w-full px-10 py-2 bg-[#ffffff] border-none "
                  />
                  {searchText && (
                    <Image
                      src="/images/cross.svg"
                      width={10}
                      height={10}
                      className="cursor-pointer absolute right-[89px]"
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


              </div>
              {
                loading2 && <> <Loader /></>
              }
              {!search && (
                <div className="my-6 flex justify-center  flex-wrap ">
                  {programs &&
                    programs.map((item, index) => (
                      <Link
                        key={index}
                        href={`/items/${encodeURIComponent(
                          item.name
                        )}?options=${encodeURIComponent(item.id)}&program_id=${item.id
                          }`}
                      >
                        <div
                          key={item.name}
                          style={{
                            width: "200px", // Set a fixed width
                            height: "80px", // Set a fixed height
                            fontSize: "30px", // Increase the font size
                            backgroundColor: item.tag_bg_color,
                            color: item.tag_text_color,
                            margin: "10px",
                          }}
                          className="uppercase hover:scale-105 transition-transform shadow-md hover:shadow-lg cursor-pointer font-[700] flex items-center justify-center py-8 px-8 text-white rounded-md"
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                </div>
              )}
              <div className="flex flex-col items-center justify-center w-full">
                {search && currentItems ? currentItems?.map((item, index) => (
                  <div key={item?.id}>
                    <div
                      onClick={() => { handleMcq(item) }}
                      className="bg-white items-center cursor-pointer w-full sm:w-[85%] lg:w-[900px] rounded-lg text-black py-1 hover:scale-[101.3%] transition-transform duration-150 px-[1.5rem] my-[1rem] border border-black-100  shadow-md">
                      <div className="flex  items-center justify-center space-x-6 font-bold">
                        Question # {index + 1}
                      </div>
                      <div className="my-2  md:mx-[2rem] font-[500] text-[18px]">
                        <>{item?.question}</>
                      </div>
                    </div>
                  </div>
                )) : <div>
                  {search && <>  No Mcq Matched ! </>}
                 
                </div>

                }
              </div>
              <div className="flex items-center justify-center w-full">
                {search && (
                  <Pagination
                    defaultCurrent={1}
                    onChange={handlePageChange}
                    total={filteredPrograms && filteredPrograms?.length}
                    responsive
                  />
                )}
              </div>
            </div>
          </main>
          <WebFooter />
        </div>
      )}
    </>
  );
};

export default Home;
