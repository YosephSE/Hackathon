import React, { useEffect, useState } from "react";
import MyVent from "../components/MyVent";
import Chatbot from "../components/Chatbot";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ventImg from '../assets/Vent.png'
import LoadingPage from '../components/Loading';
import api from '../../api/vents'

const MyVents = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [vents, setVents] = useState([])
  
  useEffect(() => {
    const getVents = async () => {
      const response = await api.get('/my/my')
      const resData = response.data
      setVents(resData)
      setIsLoading(false)
    }
    try{
      getVents()
    } catch(err){
      console.log(err)
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <div className="bg-gray-300">
      <Chatbot />
      <Header />
      <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {
        isLoading?
        <LoadingPage />
        :
        vents?.message ? (
          <div className="flex flex-col flex-grow text-center text-xl items-center justify-center h-full">
            <img src={ventImg} alt="NEW POST" className="w-28 "/>
            <p className=" justify-center p-3">
              When you share your vents, they will appear here.
            </p>
            <Link to="/createblog" className="text-sky-700 hover:text-blue-700">Share Your First post</Link>
          </div>
        ) : (
          <div className=" flex-grow ">
          {vents.map((vent) => (
            <MyVent
              img={vent.image}
              title={vent.title}
              id={vent._id}
              handleChange = {setIsLoading}
              key={vent._id}
            />
          ))}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyVents;
