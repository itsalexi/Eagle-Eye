'use client';
import React, { useState } from 'react';
import '@/style/layout.css';

export default function Hashtag({text}){
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(!isClicked); 
    };
  
    return (
        <div>
            <button
                onClick={handleClick}
                className={`rounded-full m-[0.5rem] px-4 py-2 border-2 ${
                isClicked ? 'bg-black text-white' : 'bg-white text-black border-[#cfcfd0]'
                }`}>
                {text}
            </button>
        </div>
        );
};