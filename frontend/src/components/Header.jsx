import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import home from '../assets/home.png'
import NavBar from './NavBar';


const Header = ({dataChange, page, data}) => {
    const toggleMenu = () => {
        document.getElementById("hamburgerBtn").classList.toggle('toggle-btn')
        document.getElementById("mobile-nav-bar").classList.toggle('block')
        document.getElementById("mobile-nav-bar").classList.toggle('hidden')
        document.querySelectorAll('.nav').forEach(element => {element.classList.contains('block') && element.classList.replace('block','hidden')})
    }
    return (
        <>
        <div className='bg-gradient-to-r from-[#897EFF] to-[#FFCEa0] flex justify-around lg:justify-between items-center'>
            <div className='flex justify-between  w-full py-4 min-w-80 lg:max-w-96 lg:mx-4 items-center'>
                <Link to = "/"><img src={home} alt="Home image" className='w-12 h-12'/></Link>
                {page && <SearchBar search = {dataChange} page = {page} data={data}/>}
                <button onClick={toggleMenu} id="hamburgerBtn" className="relative h-8 w-8 cursor-pointer text-3xl lg:hidden m-2">
                    <div
                        className="absolute top-4 -mt-0.5 h-1 w-8 bg-white transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:bg-white before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:bg-white after:transition-all after:duration-500 after:content-['']">
                    </div>
                </button>
            </div>
            <nav id="main-nav-bar" className='hidden lg:block mx-4 lg:mx-28'>
                <ul className='flex gap-5 justify-around'>
                    <NavBar id = "main" />
                </ul>
            </nav>
        </div>
        <nav className='absolute list-none left-2 max-w-72 top-[80px] lg:left-auto lg:right-5 bg-white'>
            <NavBar id='profile' handle={toggleMenu}/>
        </nav>
        <nav id="mobile-nav-bar" className='w-36 absolute top-[80px] right-2 hidden lg:hidden z-50'>
            <ul>
                <NavBar id="mobile" />
            </ul>
        </nav>
        </>
    );
};

export default Header
