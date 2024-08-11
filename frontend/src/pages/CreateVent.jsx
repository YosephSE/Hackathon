import React, { useEffect, useState} from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
import api from "../../api/vents"
import LoadingPage from "../components/Loading"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };
  
const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
];

const CreateBlog = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [ventData, setVentData] = useState({
        title: "",
        content: "",
    })

    function handleChange(event){
        const {name, value} = event.target
        setVentData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    function markDownChange(text){
        setVentData(prevData => ({
            ...prevData,
            content: text
        }))
    }
    
    const sumbit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        try{
            await api.post("/", ventData)
            setIsLoading(false)
            navigate('/myvents')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Chatbot />
            {
                isLoading?
                <LoadingPage />
                :
                <div className="content-center flex-grow">
                <div className="max-w-96 mx-auto my-10 p-2">
                    <h1 className="text-3xl">Create Post</h1>
                    <form onSubmit={sumbit}>
                        <input 
                            type="text" 
                            placeholder="Title" 
                            className="block p-2 w-full rounded-md mt-4 bg-gradient-to-r from-[rgba(190,162,212,28%)] to-[rgba(255,206,160,28%)] mb-4"
                            onChange={handleChange}
                            name = "title"
                            value={ventData.title}
                            required
                        />
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                value={ventData.content}
                                onChange={markDownChange}
                                className="bg-white h-20"
                                required
                            />
                            <button className="text-black bg-gradient-to-r from-[#897EFF] to-[#FFCEa0] p-2 rounded-md mt-20" type="submit">Create Post</button>
                        </form>
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}
export default CreateBlog;