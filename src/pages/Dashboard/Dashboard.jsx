import React, { useContext } from 'react';
import DarkMood from '../../common/DarkMood';
import SearchData from '../../common/SearchData';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';


import { BsTrash } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import useTrash from '../../hooks/useTrash';
import useAllTags from '../../hooks/useAllTags';

import { PiTagSimpleThin } from "react-icons/pi";
import { UserProvider } from '../../context/AuthContext';
import toast from 'react-hot-toast';

import { FaDatabase } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";


const Dashboard = () => {
    const { trash } = useTrash()
    const { tags } = useAllTags()
    const { user, logOut } = useContext(UserProvider)
    const navigate = useNavigate()

    const handelLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
                toast.success('Log out Successfully !')
            }).catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <label htmlFor="my-drawer" className="block drawer-button md:hidden"><svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg></label>
                            </button>
                            <Link to='/' className="flex ms-2 md:me-24">
                                <img src="https://i.postimg.cc/zvCk4fRm/Group-5.png" className="h-8 pl-5 me-3" alt="FlowBite Logo" />
                                {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span> */}
                            </Link>
                            <a className="hidden md:block ms-2 md:me-24">
                                <SearchData></SearchData>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className='cursor-pointer dark:text-white'>
                                <DarkMood></DarkMood>
                            </div>
                            <div className='border-r-2 cursor-pointer dark:text-white'>

                                <a onClick={handelLogOut} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>

                            </div>
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="user photo" />
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            {user?.displayName}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a onClick={handelLogOut} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="drawer md:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content dark:bg-gray-800">
                    <Outlet></Outlet>

                </div>
                <div className="mt-[60px] drawer-side dark:bg-gray-800">
                    <label htmlFor="my-drawer" aria-label="close sidebar" ></label>
                    <ul className="min-h-screen px-5 pt-5 space-y-2 font-medium bg-white dark:bg-gray-800">
                        <li>
                            <NavLink to='/Dashboard' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaDatabase className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">My Projects</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/Dashboard/projects' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LuLayoutGrid className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Sample Projects</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/Dashboard/trash' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BsTrash className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Trash</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ms-3 dark:bg-blue-900 dark:text-blue-300">{trash?.length || 0}</span>
                            </NavLink>
                        </li>
                        <li>
                            <div className="divider dark:text-white">OR</div>
                        </li>

                        <li>
                            <details className="dropdown">
                                <summary className="flex items-center pt-2 pl-3 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">  <FaTags class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" /><span className='pl-3 pr-32'>Tags</span> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg></summary>
                                <ul className="p-2  menu dropdown-content z-[1] w-full dark:text-white">
                                    {
                                        tags?.length > 0 ? <div>
                                            {
                                                tags?.map((item, i) => {
                                                    return <li key={i} className='flex items-center pl-6 cursor-pointer'>
                                                        <PiTagSimpleThin />
                                                        <Link to={`/Dashboard/tags/${item}`} class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group  dark:text-white ">#{item}</Link>
                                                    </li>
                                                })
                                            }
                                        </div> : <div className='pt-5 text-center'>No Data Here</div>
                                    }
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;