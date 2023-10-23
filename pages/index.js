import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Login from './Login';
import axios from 'axios';
import Home from './items/Index';
import Cookie from "js-cookie"
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Index() {
  const auth = useAuth();
  const router = useRouter()
  const userCookie = Cookie.get("user");

  const { data: session } = useSession()

  console.log("session is : ", session)

  const [check, setCheck] = useState(false)

  useEffect(() => {
    const checkEmail = async () => {

      try {
        const response = await axios.post("/api/check_email", { key: "Vx0cbjkzfQpyTObY8vfqgN1us", text: session.user.email });
        console.log("In check email",response)
        await Cookie.set("userId",response.data.user_id)
        
        if (response.data.error && response.data.error_message === "This Email doesn't exist") {

          console.log("condition:", response.data.error && response.data.error_message === "This Email doesn't exist")

          await router.push({ pathname: "/Register", query: { email: session.user.email, name: session.user.name } })
          // const response = await axios.post("/api/register", { key: "Vx0cbjkzfQpyTObY8vfqgN1us", email:session.user.email, fullname:session.user.name, mobilenumber:"03124231212" });
          // console.log("register response: ",response)
        }
        else {
          console.log("not condition ")
          setCheck(true)
        }


      } catch (error) {
        console.error(error);
      }

    }
    if (session) {

      checkEmail();
    }
  }, [session]);



  if (session && check)
    return (
      <Home />
    )
  else if (session && !check)
    return (
      <Home />
    )
  else if (!session) {
    return (
      <Login />
    )
  }


}
