import React from 'react';
import '@/style/layout.css';

export default function Hashtag({ text, onClick, isSelected }) {
    return (
        <div>
            <button
                onClick={() => onClick(text)}
                className={`rounded-full m-[0.5rem] px-4 py-2 border-2 ${
                    isSelected
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-[#cfcfd0]'
                } text-sm md:text-base`}
            >
                #{text}
            </button>
        </div>
    );
}
