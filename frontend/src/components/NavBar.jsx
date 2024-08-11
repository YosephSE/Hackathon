import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import api from '../../api/users'

const NavBar = ({id, handle}) =>{
    const { status, refreshStatus } = useAuth()
    const navigate = useNavigate();
    async function logOut(){
        try{
            await api.post('/logout')
        } catch (err){
            console.log(err)
        }
        refreshStatus()
        navigate("/")
    }

    const toggle = () => {
        document.getElementById('mobile-nav-bar').classList.contains('block') && handle() 
        document.querySelectorAll('.nav').forEach(element => {element.classList.toggle('block')})
        document.querySelectorAll('.nav').forEach(element => {element.classList.toggle('hidden')})
        document.querySelectorAll('.nav').forEach(element => {element.classList.toggle('lg:block')})
        document.querySelectorAll('.nav').forEach(element => {element.classList.toggle('lg:hidden')})
    }

    return (
        <>
        { status.loggedIn ?
                id === 'profile'? 
                <>
                    <li className='bg-slate-100 list-none text-black py-3 px-4 text-center border-black hover:bg-gray-400'><button className ='w-full h-full cursor-pointer'onClick={toggle}>{status.user} &#9660;</button></li>
                    <li className='nav hidden list-none bg-white lg:hidden text-[#696565] py-3 px-4 text-center border-t-[1px] border-black hover:bg-gray-400 hover:text-black'><Link to='/updateprofile'>Edit Profile</Link></li>
                    <li className='nav hidden list-none bg-white lg:hidden text-[#696565] py-3 px-4 text-center border-t-[1px] border-black hover:bg-gray-400 hover:text-black'><button onClick={logOut} className='w-full h-full cursor-pointer'>Log Out</button></li>
                </>
                :
                <>
                    <li className={id === "main" ? 'text-black py-3 px-10 bg-white rounded-3xl hover:bg-gradient-to-r from-[rgba(190,162,212,28%)] to-[rgba(255,206,160,28%)] text-xl': 'bg-white text-[#696565] py-3 px-4 text-center border-t-[1px] border-black hover:bg-gray-400 hover:text-black'}><Link to="/createblog">Create Vent</Link></li>
                    <li className={id === "main" ? 'text-black py-3 px-10 bg-white rounded-3xl hover:bg-gradient-to-r from-[rgba(190,162,212,28%)] to-[rgba(255,206,160,28%)] text-xl': 'bg-white text-[#696565] py-3 px-4 text-center border-t-[1px] border-black hover:bg-gray-400 hover:text-black'}><Link to="/myvents">My Vents</Link></li>
                </>

            :
            id === 'profile'?
            <>
            </>
            :
            <>
                <li className={id === "main" ? 'text-black py-3 px-10 bg-white rounded-3xl hover:bg-gradient-to-r from-[rgba(190,162,212,28%)] to-[rgba(255,206,160,28%)] text-xl': 'bg-white text-[#696565] py-3 px-4 text-center border-t-[1px] border-black hover:bg-gray-400 hover:text-black'}><Link to="/signin">Sign In</Link></li>
            </> 
        }
        </>
    )
}

export default NavBar;