
import React,{useEffect} from 'react';
import { Form, Input, Button } from 'antd';
import User from '../data/User';
import { message } from 'antd';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '../context/userContext';
import Loader from '../components/Loader';
import Home from '@/pages/items/Index';
import Cookies from 'js-cookie';
import GoogleButton from 'react-google-button';
import { useSession, signIn, signOut } from 'next-auth/react'


function LoginForm() {
  Cookies.set("loggedIn", "hello")
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession()

  const { updateUser, user } = useUser();

  const auth = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    key: 'Vx0cbjkzfQpyTObY8vfqgN1us',
    text: '',
    password: '',
  });

  const { text, password } = formData;
  const [loginFailed, setLoginFailed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const [check01,setCheck01] = useState(false)
  // useEffect(() => {
  //   const checkEmail = async () => {

  //     try {
  //       const response = await axios.post("/api/check_email", { key: "Vx0cbjkzfQpyTObY8vfqgN1us", text:session.user.email });
  //       if(response.error === false){
  //         setCheck01(true)
  //       }

  //     } catch (error) {
  //       console.error(error);
  //     }

  //   }
  //   checkEmail();
  // }, []);

  
  // const handleLogin = async () =>{
  //   try {
  //     setLoading(true);

  //     const response = await axios.post('/api/login_social', {key: 'Vx0cbjkzfQpyTObY8vfqgN1us', text:session.user.email});
  //     Cookies.set("user", JSON.stringify(response))
  //     console.log(response)




  //     if (response.status === 200) {
  //       setLoading(false);
  //       auth.login(response);
  //       updateUser(response.data);

  //       const serializedUserObject = JSON.stringify(response.data);

  //       Cookies.set("userObject", serializedUserObject)

  //       message.success('Logged in successfully');
  //       setTimeout(() => {
  //         router.push('/');
  //       }, 2000);
  //     } else {
  //       setLoginFailed(true); // Set loginFailed state to true on failed login
  //       message.error('Invalid email or password');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     message.error('Invalid email or password');

  //   }
  // }
  const onFinish = async () => {
    try {
      setLoading(true);

      const response = await axios.post('/api/login', formData);
      Cookies.set("user", JSON.stringify(response))
      console.log(response)



      if (response.status === 200) {
        setLoading(false);
        auth.login(response);
        updateUser(response.data);

        const serializedUserObject = JSON.stringify(response.data);

        Cookies.set("userObject", serializedUserObject)

        message.success('Logged in successfully');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setLoginFailed(true); // Set loginFailed state to true on failed login
        message.error('Invalid email or password');
      }
    } catch (error) {
      console.log(error);
      setLoginFailed(true);
      message.error('Invalid email or password');

    }
  };

  const handleSignUpClick = () => {

    signIn("google",{callbackUrl:"http://localhost:3000/Register"})

    //  router.push({pathname:"/Register", })

    
    // if(check01 ===true){

    //   router.push("/Register")
    // }
    // else{
    //   router.push("/Register")
    // }
    // handleLogin();
  };
  const goToHome = () => {

    router.push('/')
  }
  return (
    <> 
    <div className="flex flex-col text-center px-6 py-4 rounded-md shadow-md  w-[470px] border border-[#00000030]" style={{ marginTop: '-250px' }}>
      {loading && <Loader />}

      <h2 className="font-[600] text-[24px]">Login</h2>
      <p className="font-[400] text-[18px]">Please login to continue.</p>

      <Form
        name="loginForm"
        onFinish={onFinish}
        style={{ marginTop: '20px',paddingTop: '40px' }}
        layout="vertical"
      >
        {/* <Form.Item label="Email Address" className="text-[#777777] mb-2" name="email">
          <Input placeholder="Enter your email" className="border border-[#0000000F] py-2 px-3 " name="text" value={text}
            onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Password" className="text-[#777777] " name="password">
          <Input.Password className="border border-[#0000000F] py-2 px-3" placeholder="Enter your password" name="password" value={password}
            onChange={handleChange} />
        </Form.Item>

        <Form.Item>
          <Button className="bg-[#D7392B] login-btn py-5  flex w-full items-center justify-center text-white hover:text-white" block htmlType="submit">
            Log In
          </Button>
        </Form.Item>


        <div className="flex justify-center my-3">
          <div>or</div>
        </div> */}
        <Form.Item className="mb-0">
          {/* <Button  className="bg-[#1F5689] google-btn py-5  flex w-full items-center justify-center" >
            Continue with Google
          </Button> */}
          <GoogleButton onClick={handleSignUpClick} className='mx-auto mt-0'/>
        </Form.Item>


        {loginFailed ? (
          <p className="text-red-500 text-sm">
            You are not registered. Please sign up first.
          </p>) : (
          <p>

          </p>
        )
        }

      </Form>
    </div> 
    
    </>



  );
}

export default LoginForm;