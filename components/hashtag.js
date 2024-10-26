import React from 'react';
import '@/style/layout.css';

export default function Hashtag({ text, onClick, isSelected }) {
    return (
        <div>
            <button
                onClick={onClick}
                className={`rounded-full m-[0.5rem] px-4 py-2 border-2 ${
                    isSelected
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-[#cfcfd0]'
                }`}
            >
                {text}
            </button>
        </div>
    );
}
