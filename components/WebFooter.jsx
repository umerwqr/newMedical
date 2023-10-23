import React from 'react';
import { Layout } from 'antd';
import Link from 'next/link'
const { Footer: AntFooter } = Layout;

function WebFooter() {
  return (
    <AntFooter style={{ textAlign: 'center', background: "#16213E", color: "white" }}>
      <div className="flex flex-col justify-center items-center">
        <span className='bg-white rounded-full p-2'>

       
        <Link href="/">

          <img src={"https://play-lh.googleusercontent.com/1u8K3tRaNWVdkMSjNqD_r1TI0ybdijqT69u7CIi0XMCxW05AlQ3e0VPYfwFOTKhKYZo=w240-h480-rw"} alt="logo" width={60} height={60} />
        </Link>
        </span>
        <div className='sm:w-[440px] text-center my-4'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="my-3 sm:my-0">&copy; 2023. All rights reserved.</p>
        <p>Design & Developed by <Link href="/" className="text-[#F45050]">ZySoftec</Link></p>
      </div>
    </AntFooter>
  );
}

export default WebFooter;
