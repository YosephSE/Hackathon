import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoadingPage from "../components/Loading"
import api from "../../api/users";
import { useAuth } from "../AuthContext";

function UpdateProfile() {
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const { refreshStatus } = useAuth()

    const navigate = useNavigate()
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get('/profile');
                const resData = response.data;
                setName(resData.name);
                setEmail(resData.email);
                setProfilePicture(resData.profilePicture);
            } catch (err) {
                console.error(`Error: ${err}`);
            } finally{
                setIsLoading(false)
            }
        };
        getUser();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file);
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        const user = {
            name,
            email,
            profilePicture,
        };

        try {
            await api.put('/profile', user);
            refreshStatus()
            navigate('/')
        } catch (err) {
            console.error(`Error: ${err}`);
        } finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {
                isLoading?
                <LoadingPage />
                :
                <div className="flex-grow flex flex-col">
                <div className="flex items-center justify-center bg-gray-200 w-full flex-grow">
                    <div className="w-full max-w-xs md:mt-3 mt-8">
                        <form
                            className="rounded flex flex-col px-8 pt-6 pb-8 mb-4"
                            onSubmit={handleSubmit}
                        >
                            <h2 className="self-center  text-center text-2xl p-3 rounded-xl w-[60%] bg-white mb-3">Edit Profile</h2>
                            <div className="self-center flex flex-col items-center">
                                <img src={profilePicture} alt="" className="w-48 h-48 rounded-[50%] shadow-md" />
                                <label className="block my-5">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-slate-500
                                            file:py-2 file:px-4
                                            file:rounded-xl file:border-0
                                            file:text-base file:font-semibold
                                            file:bg-slate-50 file:text-black"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }

        </div>
    );
}

export default UpdateProfile;
