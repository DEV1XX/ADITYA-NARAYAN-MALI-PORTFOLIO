'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenubar } from '../Redux/Slices/MenubarSlice';

const Navbar = () => {
  const isMenuOpen = useSelector((state) => state.menubar.isMenubarOpen);
  const dispatch = useDispatch();
  const handleMenuToggle = () => {
    dispatch(toggleMenubar());  
  }
  return (
    <div className="flex justify-between items-center h-16 md:h-20 sticky top-0 z-40 mx-3 mb-0 m-3 bg-[#0C090D]">
      <div className="text-white px-4 md:px-12 py-6">
        <div className="font-orbitron text-sm md:text-base lg:text-sm ">
          ADITYA NARAYAN MALI'S
        </div>
        <div className="font-poppins text-xs md:text-sm opacity-80 ml-0 md:ml-8">
          PORTFOLIO WEBSITE
        </div>
      </div>
      
      <div className="mr-4 md:mr-12">
        <div 
          className="bg-[#212121] h-10 w-10 md:h-12 md:w-12 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 hover:shadow-lg transition-all duration-300"
          onClick={handleMenuToggle}
        >
          <span className="text-white text-xl">☰</span>
        </div>
        <div className="text-white font-poppins text-xs md:text-sm text-center mt-1">
          Menu
        </div>
      </div>
    </div>
  );
};

export default Navbar;