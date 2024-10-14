// import React from 'react'
import Header from '@/components/ui/header'
import { Outlet } from 'react-router-dom'
import { FaHeart } from "react-icons/fa6";


const AppLayout = () => {
  return (
    <div>
        <div className='grid-background'></div>
        <main className='min-h-screen container'>
        <Header />
        <Outlet />
        </main>
        <div className='p-10 text-center bg-gray-800 mt-10'>
            {/* Made with <FaHeart className='flex flex-col items-center'/> by Gunesh Badwe */}
            <div className="flex items-center justify-center bg-gray-800 p-4 text-white">
             <span className="mr-2">Made with</span>
             <FaHeart className="text-red-500" />
             <span className="ml-2">by Gunesh Badwe</span>
            </div>

        </div>
    </div>
  );
};

export default AppLayout
