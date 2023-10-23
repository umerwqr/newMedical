import { Layout, Button, Avatar, Menu, Dropdown, Drawer } from "antd";
import { Input, Pagination, Radio } from "antd";

import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
const { Header } = Layout;
import { message } from "antd";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useUser } from "../context/userContext";
import {useSession, signIn, signOut} from 'next-auth/react'


function WebHeader() {
  const { data: session } = useSession()

  // const { user } = useUser();
  const { updateUser } = useUser();
  const userCookie = Cookies.get("user");
  const [searchText, setSearchText] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("PREP Mode");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  console.log("filtered program:", filteredOptions && filteredOptions);
  const pageSize = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const [userObject, setUserObject] = useState(null);
  console.log("iiuuuuuu", userObject);
  useEffect(() => {
    if (userCookie) {
      setUserObject(JSON.parse(userCookie));
    }
  }, [userCookie]);

  const auth = useAuth();
  const router = useRouter();
  const { clearUserFromLocalStorage } = auth;
  console.log(auth.user?.firstName);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const LogOut = () => {
    Cookies.remove("user");

    clearUserFromLocalStorage();
    updateUser(null);

    Cookies.remove("loggedIn");
    setTimeout(() => {
      message.info("You have been logged out!");
    }, 2000);

    router.push("/");
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentItems =
    filteredOptions && filteredOptions.slice(startIndex, endIndex);
  const findOptionsByName = (name) => {
    const foundOptions = Data.find((item) => true);
    if (foundOptions) {
      setSelectedData(foundOptions);
      setSelectedOptions(foundOptions.options);
      //setFilteredOptions(foundOptions.options);
    } else {
      setSelectedOptions([]);
      setSelectedData({});
      // setFilteredOptions([]);
    }
  };

  useEffect(() => {
    // if (searchText) {
    //   const filtered = selectedOptions.filter(option => option.name.toLowerCase().includes(searchText.toLowerCase()));
    //   setFilteredOptions(filtered);
    // } else {
    //   setFilteredOptions(selectedOptions);
    // }
    const fetchData = async () => {
      if (searchText !== "") {
        try {
          const response = await axios.post("/api/search_mcqs", {
            key: "Vx0cbjkzfQpyTObY8vfqgN1us",
            wordSearch: searchText.toLowerCase(),
          });
          setFilteredOptions(response.data.mcqs);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };
  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="User">
        <Link href="/UserProfile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="menu" onClick={()=>{LogOut(), signOut()}}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="bg-white-500 p-2">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left Side: Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="cursor-pointer"> <Image src={"https://play-lh.googleusercontent.com/1u8K3tRaNWVdkMSjNqD_r1TI0ybdijqT69u7CIi0XMCxW05AlQ3e0VPYfwFOTKhKYZo=w240-h480-rw"} alt="logo" width={60} height={60} /> </Link>
            {/* Social Icons */}
            <div className="flex space-x-2">
              <span className="text-white hover:text-gray-200">
                <Image
                  src="/images/youtube.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
              <span className="text-white hover:text-gray-200">
                <Image
                  src="/images/facebook.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
              <span className="text-white hover:text-gray-200">
                <Image
                  src="/images/whatsapp.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
              <span className="">
                <Image
                  src="/images/instagram.svg"
                  color=""
                  alt="logo"
                  width={30}
                  height={30}
                />
              </span>
            </div>
          </div>

          {/* Right Side: Menu Items */}
          <div className="hidden lg:flex space-x-6 items-center">
            <Link
              href="#"
              className="text-[#242864] mt-5 pr-10"
              style={{ fontWeight: 600 }}
            >
              Install App
            </Link>
            <Link
              href="#"
              className="text-[#242864] mt-5 pr-10"
              style={{ fontWeight: 600 }}
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-[#242864] mt-5 pr-10"
              style={{ fontWeight: 600 }}
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-[#242864] mt-5 pr-10"
              style={{ fontWeight: 600 }}
            >
              PDF Heaven
            </Link>
            <Link
              href="#"
              className="text-[#242864] mt-5 pr-10"
              style={{ fontWeight: 600 }}
            >
              Premium
            </Link>
            <span className="flex pr-10">
              <Link href="/">
                <Image
                  src="/images/home.png"
                  color=""
                  alt="logo"
                  width={40}
                  height={40}
                />
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Header className="bg-red-700 px-3 h-[200px]">
        <div
          style={{ paddingLeft: "0px" }}
          className={`flex text-[16px] pt-0 px-0   text-white font-bold items-center ${session ? "justify-between md:px-4  " : "justify-center"
            } `}
        >
          <div className="flex flex-col w-full">


            <div className="flex justify-around w-full ">


              {session ? (
                <>
                  <Link
                    className="hidden  lg:block custom-link"
                    href="/items/general/mcqs/"
                  >
                    <div className="hidden  lg:block xl:block cursor-pointer ">
                      Subjectwise Mcqs
                    </div>
                  </Link>
                  <Link
                    className="hidden  lg:block custom-link"
                    href="/items/general/papers/"
                  >
                    <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer ">
                      Past Papers
                    </div>
                  </Link>

                  <Link
                    className="hidden  lg:block custom-link"
                    href="/items/general/guide/"
                  >
                    <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer ">
                      Guidelines
                    </div>
                  </Link>

                  <Link
                    className="hidden  lg:block custom-link"
                    href="/items/general/mock/"
                  >
                    <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer ">
                      Mocks
                    </div>
                  </Link>

                  <Link href="/items/general/bookmarks/" className="custom-link">
                    <div
                      className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer  "
                      style={{ width: "110px" }}
                    >
                      Bookmarks
                    </div>
                  </Link>

                  <Link href="/items/general/notes/" className="custom-link">
                    <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer ">
                      MCQ Notes
                    </div>
                  </Link>

                  <Link href="/items/general/card/" className="custom-link">
                    <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer ">
                      Flash Cards
                    </div>
                  </Link>
                </>
              ) : (
                <> </>
              )}

            </div>
            <hr className="border-2 w-[94%] ml-12 border-white hidden md:flex " />

          </div>
          <div className="  ml-[8px]">
            {session ? (
              <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
                <div className="rounded-lg  text-white cursor-pointer flex justify-end items-center ml-1 h-15 my-2 px-2  ">
                  <Image
                    className="rounded-full mr-1"
                    src={session.user.image}
                    width={50}
                    height={50}
                    alt="userImage"
                  />
                  <div className="">

                 
                  {session.user.name.split(' ')[0]}
                  </div>

                </div>
              </Dropdown>
            ) : (
              <></>
            )}
          </div>
        </div>



        {/* <main className="w-full h-full xxl:h-[100vh] flex items-center xl:items-start justify-center">
          <div className=" py-[6rem] px-4   w-full">
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
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={selectedRadio}
                  >
                    <Radio
                      value="PREP Mode"
                      className={
                        selectedRadio === "PREP Mode" ? "red-radio " : ""
                      }
                    >
                      PREP Mode
                    </Radio>
                    <Radio
                      value="Exam Mode"
                      className={
                        selectedRadio === "Exam Mode" ? "red-radio" : ""
                      }
                    >
                      Exam Mode
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            {!searchText && (
              <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">
                <div className="flex  sm:w-[90%] w-full flex-wrap justify-center">
                  {selectedOptions.map((option, index) => {
                    const optionName = getOptionText(option.name);
                    return (
                      <Link
                        href={{
                          pathname: `/items/name/${optionName}`,
                          query: {
                            program_id: program_id,
                          },
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
            )}
            <div className="flex flex-col items-center justify-center">
              {currentItems &&
                currentItems?.map((item, index) => (
                  <div key={item?.id}>
                    <div
                      onClick={() => {
                        handleMcq(item);
                      }}
                      className="bg-white cursor-pointer w-full sm:w-[80%] lg:w-[700px] rounded-lg text-black py-5 px-[1.5rem] my-[3rem] shadow-md "
                    >
                      <div className="flex  items-center justify-center w-full space-x-6 font-bold">
                        Question # {index + 1}
                      </div>
                      <div className="my-6  md:mx-[2rem] font-[500] text-[18px]">
                        <>{item?.question}</>
                      </div>
                    </div>
                  </div>
                ))}
              <Pagination
                style={{ marginTop: "30px" }}
                defaultCurrent={1}
                onChange={handlePageChange}
                total={filteredOptions && filteredOptions?.length}
              />
            </div>
          </div>
        </main> */}


      </Header>
    </div>
  );
}

export default WebHeader;
