'use client';
import React, { useState } from 'react';
import Hashtag from '@/components/hashtag';
import SearchTags from '@/components/searchtags';
import { Textarea } from "@/components/ui/textarea"
import '@/style/layout.css';

export default function Create(){
    const trending_hashtags = [
        'SEC A',
        'justice',
        'education',
        'growth',
        'future',
        'collaboration',
    ];

    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const handleHashtag = (text) => {
        console.log(text);
        if (selectedHashtags.includes(text)) {
            setSelectedHashtags(
                selectedHashtags.filter((hashtag) => hashtag !== text)
            );
        } else {
            setSelectedHashtags([...selectedHashtags, text]);
        }
    };

    return(
        <div className='front-create'>
            <div className='create-title'>
                Create Post
            </div>
            <div className='tags'>
                <p>Add Tags...</p>
                <div className='trending-tags'>
                    <div className="trending-hashtags">
                        {trending_hashtags.map((hashtag) => (
                            <Hashtag
                                onClick={() => handleHashtag(hashtag)}
                                key={`${hashtag}_hashtag`}
                                text={`#${hashtag}`}
                            />
                        ))}
                    </div>
                <div className='search-create'>
                    <SearchTags />
                </div>
                </div>
            </div>
            <div className='messeage-create'>
                <Textarea className='h-full'/>
            </div>
            <div className='post-create'>
                <button
                    className='rounded-full float-right m-[0.5rem] px-4 py-2 border-2 $ bg-black text-white border-black'
                >
                    Post
                </button>
            </div>
        </div>
    );
}
