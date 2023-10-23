import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';
import Loader from '../components/Loader';
import cookie from "js-cookie"
import Home from '@/pages/items/Index';
import Modal from '@/components/Model';


function RegisterForm() {

  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const router = useRouter();

  const {email,name} =router.query;
  console.log(email, " and ", name)
  const registerCookie=cookie.get("register")
  
  const containsEmail = (name) => {
    // Regular expression to check if the name contains an email address
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return emailRegex.test(name);
  }
  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression to validate phone number with exactly 11 digits
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  }  
  const [form] = Form.useForm();
  const [check,setCheck]=useState(false)

  const [newUser,setNewUser]=useState({
    key:"Vx0cbjkzfQpyTObY8vfqgN1us",
    mobilenumber:'',
    fullname:name,
    email:email,
    password:'',
    rePassword:''
  })

  const onFinish = async(e) => {
    const checkEmail=validateEmail(newUser.email)
    const checkName=containsEmail(newUser.fullname)
    const checkPhoneNumber=validatePhoneNumber(newUser.mobilenumber)
    console.log('check   --- ',checkEmail, checkName, checkPhoneNumber)
        try{
    

    if(newUser.password !==newUser.rePassword){
       setCheck(true)
    }
    else if(!checkEmail  || checkName){
      message.error("Registration Failed Due to wrong email or name format")
      setLoading(false)
    }
    else if(!checkPhoneNumber){

      message.error("Registeration Failed, phone length should be equal to 11 digits")
      setLoading(false)
    }
    // else if(password.length<7){
    //   message.error("Registeration Failed, Password Length should be more than 6 digits")
    //   setLoading(false)
    // }
    else{
      setLoading(true);
      const response = await axios.post('/api/register', newUser);
        console.log(response)
        
      if(!response.data.error){
        setLoading(false);

        setTimeout(() => {
          router.push("/")
        }, 3000);
        console.log(response)
        cookie.set("user_id",newUser.user_id)
        cookie.set("register",newUser.email)
        message.success('Registration successful');

      }
      else{
        console.log(response.data.error_message)
        message.error(response.data.error_message);
        setLoading(false)
        router.push("/")

      }

    }
  }catch(error){

  }
  };

 

  return (
    <div className="flex flex-col text-center px-6 py-5 rounded-md shadow-sm w-[470px] border border-[#00000030]">
    {loading && (
        <div className="modal-overlay">
          
            <Loader />
          
        </div>
      )}
      <h2 className="font-[600] text-[24px]">Register</h2>
      <p className="font-[400] text-[18px]">Please register to continue.</p>
      
      <Form
        name="registerForm"
        onFinish={onFinish}
        form={form}
        style={{ marginTop: '20px' }}
        layout="vertical"
        initialValues={{
          fullName: name, // Set the initial value for Full Name
          email: email// Set the initial value for Re-enter Password (if needed)
        }}
      >
        <Form.Item 
        label="Full Name" 
        className="text-[#777777] mb-2" 
        name="fullName">
          <Input 
          disabled
          value={newUser.fullname}
          // onChange={(e)=>setNewUser({ ...newUser,fullname:e.target.value})}
          placeholder="Enter your full name" 
          className="border border-[#0000000F] py-2 px-3" />
        </Form.Item>

        <Form.Item 
        label="Email Address" 
        className="text-[#777777] mb-2" 
        name="email">
          <Input 
          disabled
          value={newUser.email}
          // onChange={(e)=>setNewUser({...newUser,email:e.target.value})}
          placeholder="Enter your email" 
          className="border border-[#0000000F] py-2 px-3" />
        </Form.Item>

        <Form.Item 
        label="Phone Number" 
        className="text-[#777777] mb-2" 
        name="phoneNumber">
          <Input 
          value={newUser.mobilenumber}
          onChange={(e)=>setNewUser({...newUser,mobilenumber:e.target.value})}
          placeholder="Enter your phone number" 
          className="border border-[#0000000F] py-2 px-3" />
        </Form.Item>

        <Form.Item 
        label="Create Password" 
        className="text-[#777777] mb-2" 
        name="password" 
        rules={[{ required: true, message: 'Please enter a password' }]}>
          <Input.Password 
          value={newUser.password}
          placeholder="Enter your password" 
          className="border border-[#0000000F] py-2 px-3" 
          onChange={(e)=>setNewUser({...newUser,password:e.target.value})} />
        </Form.Item>

        <Form.Item 
        label="Re-enter Password" 
        className="text-[#777777] mb-2" 
        name="rePassword" 
        rules={[{ required: true, message: 'Please Re Enter your password' }]}>
          <Input.Password 
          value={newUser.rePassword}
          placeholder="Re Enter your password" 
          className="border border-[#0000000F] py-2 px-3" 
          onChange={(e)=>setNewUser({...newUser,rePassword:e.target.value})} />
        </Form.Item>
         {check? (
          <p style={{color:"red"}}>
            password and Re Password are not same

          </p>
         ):(
          <p>

          </p>
         )}

        <Form.Item className="my-5">
          <Button disabled={loading} className="bg-[#3F93FF] register-btn py-5  flex w-full items-center justify-center text-white hover:text-white" block htmlType="submit">
            Register
          </Button>
          
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterForm;
