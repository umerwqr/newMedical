import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Upload, Avatar, Modal, Select } from "antd";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/router";
import { UploadOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useUser } from "../context/userContext";
import Cookies from "js-cookie";
import Popup4 from "./popUp4";
const { Option } = Select;
import {useSession, signIn, signOut} from 'next-auth/react'

function ProfileForm() {
  // const userCookie = Cookies.get("user");
  const user_Id = Cookies.get("userId");

  const { data: session } = useSession()

  // const [userObject, setUserObject] = useState(null);
  // useEffect(() => {
  //   if (userCookie) {
  //     setUserObject(JSON.parse(userCookie));
  //   }
  // }, [userCookie]);

  
  // const { user } = useUser();

  const auth = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id:user_Id, 
    key: "Vx0cbjkzfQpyTObY8vfqgN1us",
    full_name: "",
    phone: "",
    email:"",
    pmdc_number: 123, 
    city_id: 1400,
    programs: [],
    institutions: [],
    specialities: [],
    qualifications: [],
    about_me: "",
    achievements: "",
    publications: "",
    doctor_extra_curricular_activities: ""


  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    console.log("formData is :",formData)
    if(formData.full_name==""||formData.phone==""||formData.email==""||formData.pmdc_number==""||formData.city_id==""||formData.programs==""||formData.institutions==""||formData.specialities==""||formData.qualifications==""||formData.about_me==""||formData.achievements==""||formData.publications==""||formData.doctor_extra_curricular_activities==""){
      message.error("No Field should be empty")
    }
    // console.log(user.user_id);

    console.log(formData);

    try {
      const response = await axios.post("/api/update", formData);
      console.log(response);

      message.success("Update profile successfully");
      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (error) {
      message.error("Error in Updating profile")
      console.log(error);
    }
  };


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const handleOk = () => {
    setIsModalVisible(false);
    if (selectedCity) {
      // You can do something with the selectedCity value here
      console.log('Selected City:', selectedCity);
    }
  };

  const [showModal, setShowModal] = useState(false)
  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleExperience = (experience) => {
    console.log(experience);
    setFormData((prevFormData) => ({
      ...prevFormData,
      experiences: [...prevFormData.experiences, experience],
    }));
  };
  return (
    <div className="flex flex-col px-6 py-5 rounded-md shadow-sm w-[80%] border border-[#00000030]">
      <h2 className="font-[600] text-[24px]">Update Profile</h2>
      <Form
        name="profileForm"
        onFinish={onFinish}
        style={{ marginTop: "20px" }}
        layout="vertical"
        initialValues={{
          fullName: session?.user.name, // Set the initial value for Full Name
          email: session?.user.email// Set the initial value for Re-enter Password (if needed)
        }}
      >
        <Form.Item
          label="Full Name"
          className="text-[#777777] mb-2"
          name="fullName"
        >
          <Input
            placeholder="Full Name"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Email Address" name="email" className="text-[#777777] mb-2">
          <Input
            placeholder="Email Address"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.email}
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          className="text-[#777777] mb-2"
          name="phone"
        >
          <Input
            placeholder="Phone Number"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="PMDC" className="text-[#777777] mb-2" name="pmdc">
          <Input
            placeholder="PMDC"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.pmdc_number}
            onChange={(e) =>
              setFormData({ ...formData, pmdc_number: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="City" className="text-[#777777] mb-2" name="city">
          <Input
            placeholder="City"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.city_id}
            onChange={(e) =>
              setFormData({ ...formData, city_id: e.target.value })
            }
          />
        </Form.Item>
{/* 
        <Form.Item
          label="PG Trainee"
          className="text-[#777777] mb-2"
          name="current"
        >
          <Select
            placeholder="Select"
            value={formData.current}
            onChange={(value) => setFormData({ ...formData, current: value })}
          >
            <Option value="specialist">Specialist</Option>
            <Option value="PG Trainee">PG trainee</Option>
            <Option value="PG Exam Candidate">PG Exam Candidate</Option>
            <Option value="General Practitioner">General Practitioner</Option>
            <Option value="House Officer">House Officer</Option>
            <Option value="MBBS Student">MBBS Student</Option>
          </Select>
        </Form.Item> */}

        <Form.Item
          label="Current Program"
          className="text-[#777777] mb-2"
          name="currentProgram" // Changed name to a more descriptive one
        >
          <Select
            placeholder="Current Program"
            mode="multiple" // Set mode to 'multiple'
            value={formData.programs}
            onChange={(value) => setFormData({ ...formData, programs: value })} // Changed city_id to programs
          >
            <Option value="DENTAL">DENTAL</Option>
            <Option value="IMM">IMM</Option>
            <Option value="PLAB">PLAB</Option>
            <Option value="USMLE">USMLE</Option>
            <Option value="FCPS-2">FCPS-2</Option>
            <Option value="NEET PG">NEET PG</Option>
            <Option value="MRCP">MRCP</Option>
            <Option value="MCAT">MCAT</Option>
            <Option value="MDCAT">MDCAT</Option>
            <Option value="FCPS-1">FCPS-1</Option>
            <Option value="MD/MS">MD/MS</Option>
            <Option value="NLE">NLE</Option>
            <Option value="MBBS">MBBS</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Institutions"
          className="text-[#777777] mb-2"
          name="institutions" // Changed name to a more descriptive one
        >
          <Select
            placeholder="Select Institutes"
            mode="multiple" // Set mode to 'multiple'
            value={formData.institutions}
            onChange={(value) => setFormData({ ...formData, institutions: value })} // Changed city_id to programs
          >
            <Option value="Abbotabad International Medical College, Abbottabad.">Abbotabad International Medical College, Abbottabad.</Option>
            <Option value="Akhtar Saeed Medical & Dental COllege, Lahore.">Akhtar Saeed Medical & Dental COllege, Lahore.</Option>
            <Option value="Al Razi Medical College, Peshawar.">Al Razi Medical College, Peshawar.</Option>
            <Option value="Al Nafees Medical College, Islamabad.">Al Nafees Medical College, Islamabad.</Option>
            <Option value="Al-Tibri Medical College, Karachi.">Al-Tibri Medical College, Karachi.</Option>
            <Option value="Allama Iqbal College of Physiotherapy, Lahore.">Allama Iqbal College of Physiotherapy, Lahore.</Option>
            <Option value="Allama Iqbal Medical College, Lahore.">Allama Iqbal Medical College, Lahore.</Option>
            <Option value="Ameer-ud-Din Medical College, Lahore.">Ameer-ud-Din Medical College, Lahore.</Option>
            <Option value="American Academy of Aesthetic Medicine.">American Academy of Aesthetic Medicine.</Option>
            <Option value="American Association of Implantology.">American Association of Implantology.</Option>
            <Option value="American Board Of Clinical Neurophysiology.">American Board Of Clinical Neurophysiology.</Option>
            <Option value="American Board Of Psychiatry & Neurology.">American Board Of Psychiatry & Neurology.</Option>
            <Option value="American College of Cardiology, USA.">American College of Cardiology, USA.</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Specialities"
          className="text-[#777777] mb-2"
          name="specialities" // Changed name to a more descriptive one
        >
          <Select
            placeholder="Select Institutes"
            mode="multiple" // Set mode to 'multiple'
            value={formData.specialities}
            onChange={(value) => setFormData({ ...formData, specialities: value })} // Changed city_id to programs
          >
            <Option value="Anesthesiology">Anesthesiology</Option>
            <Option value="Community">Community</Option>
            <Option value="Dentistry">Dentistry</Option>
            <Option value="E.N.T">E.N.T</Option>
            <Option value="General Surgery">General Surgery</Option>
            <Option value="Gynae/Obs">Gynae/Obs</Option>
            <Option value="Medicine">Medicine</Option>
            <Option value="Opthalmology">Opthalmology</Option>
            <Option value="Paediatrics">Paediatrics</Option>
            <Option value="Pathology">Pathology</Option>
            <Option value="Psychiatry">Psychiatry</Option>
            <Option value="Radiology">Radiology</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Qualifications"
          className="text-[#777777] mb-2"
          name="qualifications" // Changed name to a more descriptive one
        >
          <Select
            placeholder="Select Qualifications"
            mode="multiple" // Set mode to 'multiple'
            value={formData.qualifications}
            onChange={(value) => setFormData({ ...formData, qualifications: value })} // Changed city_id to programs
          >
            <Option value="MBBS">MBBS</Option>
            <Option value="ATMF">ATMF</Option>
            <Option value="B.Sc (Gynae/Obs)">B.Sc (Gynae/Obs)</Option>
            <Option value="D.Obst">D.Obst</Option>
            <Option value="DCPS">DCPS</Option>
            <Option value="DGO">DGO</Option>
            <Option value="DGO(IR)">DGO(IR)</Option>
            <Option value="DHP">DHP</Option>
            <Option value="Dip">Dip</Option>
            <Option value="DMAS (Ind)">DMAS (Ind)</Option>
            <Option value="DMRCS">DMRCS</Option>
            <Option value="DOWH">DOWH</Option>
            <Option value="DRCOG">DRCOG</Option>
            <Option value="DRCP">DRCP</Option>
            <Option value="DTCD">DTCD</Option>
            <Option value="FACOG">FACOG</Option>
            <Option value="FACS">FACS</Option>
            <Option value="FCPS">FCPS</Option>
            <Option value="Fellowship Gynae Endoscopy AEC">Fellowship Gynae Endoscopy AEC</Option>
            <Option value="FICS">FICS</Option>
            <Option value="FIMSA">FIMSA</Option>
            <Option value="FMAS (Ind)">FMAS (Ind)</Option>

          </Select>
        </Form.Item>

        <Form.Item label="About Me" className="text-[#777777] mt-5" name="about_me">
          <textarea
            placeholder="Tell us about yourself"
            className="border  border-[#0000000F] py-2 px-3 w-full shadow-lg rounded-xl"
            value={formData.about_me}
            onChange={(e) =>
              setFormData({ ...formData, about_me: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Achievements" className="text-[#777777] mt-5" name="achievements">
          <textarea
            placeholder="Tell us about your achievements"
            className="border  border-[#0000000F] py-2 px-3 w-full shadow-lg rounded-xl"
            value={formData.achievements}
            onChange={(e) =>
              setFormData({ ...formData, achievements: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Publications" className="text-[#777777] mt-5" name="publications">
          <textarea
            placeholder="Tell us about your publications"
            className="border  border-[#0000000F] py-2 px-3 w-full shadow-lg rounded-xl"
            value={formData.publications}
            onChange={(e) =>
              setFormData({ ...formData, publications: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Extra Curricular Activites" className="text-[#777777] mt-5" name="doctor_extra_curricular_activities">
          <textarea
            placeholder="Tell us about your extra curricular activities"
            className="border  border-[#0000000F] py-2 px-3 w-full shadow-lg rounded-xl"
            value={formData.doctor_extra_curricular_activities}
            onChange={(e) =>
              setFormData({ ...formData, doctor_extra_curricular_activities: e.target.value })
            }
          />
        </Form.Item>

        {/* <button
          onClick={handleModal}

          className=" bg-green-500 text-white p-2 rounded-sm">
          + Add Experience
        </button>

        {<Popup4 showModal={showModal} setShowModal={handleModal} onPush={handleExperience} />} */}
{/* 
        {formData?.experiences?.map((item, index) => {
          <div
            key={index}
          >
            <p>Place Name: {item.place_name}</p>
            <p>Designation: {item.designation}</p>
            <p>Time Period: {item.period}  {item.period_unit}</p>


          </div>
        })} */}
        <Form.Item>
          <Button
            className="bg-[#3F93FF] update-btn py-5 mt-4 flex w-full items-center justify-center text-white hover:text-white"
            block
            htmlType="submit"
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProfileForm;
