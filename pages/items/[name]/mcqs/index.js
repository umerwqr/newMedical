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
import cookie from "js-cookie"
import axios from "axios";
import Loader from "@/components/Loader";

const Subject = () => {
  const router = useRouter();
  const { program_id } = router.query;
  cookie.set("programId",program_id)
  cookie.remove("unitId")

  const [data, setData] = useState(null);
  console.log("UNITS data", data);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("/api/subjects_units", {
          key: "Vx0cbjkzfQpyTObY8vfqgN1us",
        });
        setLoading(false);
        
        // Sort the subjects alphabetically
        const sortedData = response.data.subjects.sort((a, b) => a.name.localeCompare(b.name));
        setData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
console.log("dddddddaaaaaTTTTTTaaa:",data&&data)
  // const handleUnits=(units)=>{
  //   cookie.set("units", JSON.stringify(units));

  //   setTimeout(() => {
  //     router.push("/items/name/mcqs/unit");
  //   }, 2000);


  // }
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
              <h1 className="font-[700] text-[32px]">Select Subject</h1>
            </div>

            <div className="my-[3rem]   flex justify-center w-full   flex-wrap px-6">
              {data &&
                data.map((subject, index) => (
                  <SubjectCard
                    key={index}
                    subject={subject}
                    id={subject.id}
                    name={subject.name}
                    url={subject.image_url}
                    count={`MCQs: ${subject.mcqs_count}`}
                    link={{
                      pathname: `/items/name/mcqs/unit?`,
                      query: { subject: JSON.stringify(subject), program_id },
                    }}
                  />
                ))}
            </div>
          </main>
          <WebFooter />
        </div>
      )}
    </>
  );
};

export default Subject;
