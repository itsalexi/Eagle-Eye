'use client';

import Hashtag from '@/components/hashtag';
import Message from '@/components/message';
import SearchTags from '@/components/searchtags'
import { useState } from 'react';
import '@/style/layout.css';

export default function Home() {
    const messages = [
        {
            postId: 1,
            timestamp: 1729910701000,
            message: 'hello',
            comments: [],
            likes: 15,
            dislikes: 3,
            hashtags: ['SEC A'],
        },
    ];

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

    return (
        <div className="flex flex-row ml-5 home-page">
            <div className="flex flex-row">
                <div className="trending-hashtags">
                    {trending_hashtags.map((hashtag) => (
                        <Hashtag
                            onClick={() => handleHashtag(hashtag)}
                            key={`${hashtag}_hashtag`}
                            text={`#${hashtag}`}
                        />
                    ))}
                </div>
                <div className='search'>
                    <SearchTags />
                </div>
            </div>

            <div className="messages-list">
                {messages.map((msg) => (
                    <Message
                        key={msg.postId}
                        highlighted={msg.hashtags.filter((hashtag) =>
                            selectedHashtags.includes(hashtag)
                        )}
                        msgObject={msg}
                    />
                ))}
            </div>
        </div>
    );
}
