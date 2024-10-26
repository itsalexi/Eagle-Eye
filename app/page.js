'use client';

import Hashtag from '@/components/hashtag';
import Message from '@/components/message';
import SearchTags from '@/components/searchtags';
import { useState } from 'react';
import '@/style/layout.css';

export default function Home() {
    const messages = [
        {
            postId: 1,
            timestamp: 1729622657971,
            message: 'Game night!',
            comments: ['Nice post!'],
            likes: 10,
            dislikes: 9,
            hashtags: ['Blue Eagle Gym', 'MVP'],
        },
        {
            postId: 2,
            timestamp: 1729061689256,
            message: 'Enjoying the sun at Bel Field!',
            comments: ['Nice post!', 'Nice post!'],
            likes: 52,
            dislikes: 6,
            hashtags: ['Zen Garden', 'Gonz'],
        },
        {
            postId: 3,
            timestamp: 1729832274011,
            message: 'Just finished a project!',
            comments: ['Nice post!', 'Nice post!', 'Nice post!', 'Nice post!'],
            likes: 97,
            dislikes: 3,
            hashtags: ['Xavier', 'Gonz', 'Blue Eagle Gym'],
        },
        {
            postId: 4,
            timestamp: 1729721384451,
            message: 'Enjoying the sun at Bel Field!',
            comments: ['Nice post!', 'Nice post!', 'Nice post!'],
            likes: 17,
            dislikes: 2,
            hashtags: ['Blue Eagle Gym', 'Gonz'],
        },
        {
            postId: 5,
            timestamp: 1729881248533,
            message: 'Game night!',
            comments: ['Nice post!', 'Nice post!', 'Nice post!', 'Nice post!'],
            likes: 10,
            dislikes: 10,
            hashtags: ['SEC A', 'Iggys', 'Bel Field'],
        },
        {
            postId: 6,
            timestamp: 1729809979704,
            message: 'Study session at Gonz!',
            comments: [
                'Nice post!',
                'Nice post!',
                'Nice post!',
                'Nice post!',
                'Nice post!',
            ],
            likes: 35,
            dislikes: 7,
            hashtags: ['Blue Eagle Gym', 'Xavier'],
        },
        {
            postId: 7,
            timestamp: 1729369899573,
            message: 'Anyone in SEC A?',
            comments: [],
            likes: 74,
            dislikes: 0,
            hashtags: ['SEC A'],
        },
        {
            postId: 8,
            timestamp: 1729243357261,
            message: 'Anyone in SEC A?',
            comments: ['Nice post!', 'Nice post!', 'Nice post!', 'Nice post!'],
            likes: 76,
            dislikes: 1,
            hashtags: ['Bel Field', 'MVP', 'Iggys'],
        },
        {
            postId: 9,
            timestamp: 1729571069051,
            message: 'Just finished a project!',
            comments: ['Nice post!'],
            likes: 78,
            dislikes: 2,
            hashtags: ['Bel Field'],
        },
        {
            postId: 10,
            timestamp: 1729854713051,
            message: 'Anyone in SEC A?',
            comments: [
                'Nice post!',
                'Nice post!',
                'Nice post!',
                'Nice post!',
                'Nice post!',
            ],
            likes: 32,
            dislikes: 2,
            hashtags: ['Iggys', 'Zen Garden', 'MVP'],
        },
        {
            postId: 11,
            timestamp: 1729386139360,
            message: 'Had a great day!',
            comments: [],
            likes: 46,
            dislikes: 6,
            hashtags: ['SEC A', 'Zen Garden'],
        },
        {
            postId: 12,
            timestamp: 1729392247229,
            message: 'Study session at Gonz!',
            comments: [
                'Nice post!',
                'Nice post!',
                'Nice post!',
                'Nice post!',
                'Nice post!',
            ],
            likes: 43,
            dislikes: 10,
            hashtags: ['Iggys', 'Gonz'],
        },
        {
            postId: 13,
            timestamp: 1729562553224,
            message: 'Who’s at Zen Garden?',
            comments: [],
            likes: 42,
            dislikes: 10,
            hashtags: ['Zen Garden', 'Iggys', 'MVP'],
        },
        {
            postId: 14,
            timestamp: 1729002308827,
            message: 'Anyone in SEC A?',
            comments: ['Nice post!', 'Nice post!', 'Nice post!'],
            likes: 61,
            dislikes: 1,
            hashtags: ['Zen Garden'],
        },
        {
            postId: 15,
            timestamp: 1729707431851,
            message: 'What a wonderful world!',
            comments: ['Nice post!', 'Nice post!'],
            likes: 32,
            dislikes: 0,
            hashtags: ['Xavier', 'MVP', 'Gonz'],
        },
        {
            postId: 16,
            timestamp: 1729420195034,
            message: 'Anyone in SEC A?',
            comments: [],
            likes: 22,
            dislikes: 1,
            hashtags: ['SEC A'],
        },
        {
            postId: 17,
            timestamp: 1729030498020,
            message: 'Hanging out at MVP!',
            comments: ['Nice post!', 'Nice post!'],
            likes: 29,
            dislikes: 2,
            hashtags: ['Blue Eagle Gym'],
        },
        {
            postId: 18,
            timestamp: 1729213210217,
            message: 'Had a great day!',
            comments: [],
            likes: 52,
            dislikes: 8,
            hashtags: ['Blue Eagle Gym'],
        },
        {
            postId: 19,
            timestamp: 1729313665683,
            message: 'Enjoying the sun at Bel Field!',
            comments: ['Nice post!'],
            likes: 41,
            dislikes: 4,
            hashtags: ['Gonz'],
        },
        {
            postId: 20,
            timestamp: 1729316380272,
            message: 'What a wonderful world!',
            comments: ['Nice post!', 'Nice post!', 'Nice post!', 'Nice post!'],
            likes: 80,
            dislikes: 10,
            hashtags: ['Xavier', 'SEC A'],
        },
    ];

    const getTopTrendingHashtags = (messages, amount) => {
        const hashtagCounts = {};

        messages.forEach((msg) => {
            msg.hashtags.forEach((tag) => {
                hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
            });
        });
        const trendingHashtags = Object.entries(hashtagCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count
            .slice(0, amount) // Take the top N entries
            .map((entry) => entry[0]); // Extract just the hashtag

        return trendingHashtags;
    };

    const getFilteredMessages = (messages, selectedTags) => {
        if (selectedTags.length == 0) return messages;
        return messages.filter((message) =>
            message.hashtags.some((item) => selectedTags.includes(item))
        );
    };

    const trending_hashtags = getTopTrendingHashtags(messages, 6);

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

    const handleSearchTagsChange = (newTags) => {
        setSelectedHashtags(newTags);
    };

    return (
        <div className="flex flex-row ml-5 home-page">
            <div className="flex flex-row h-20 bg-blue">
                <div className="trending-hashtags">
                    {trending_hashtags.map((hashtag) => (
                        <Hashtag
                            onClick={() => handleHashtag(hashtag)}
                            key={`${hashtag}_hashtag`}
                            text={`#${hashtag}`}
                            isSelected={selectedHashtags.includes(hashtag)}
                        />
                    ))}
                </div>
                <div className="search">
                    <SearchTags
                        selectedTags={selectedHashtags}
                        onTagsChange={handleSearchTagsChange}
                    />
                </div>
            </div>

            <div className="messages-list">
                <p className="text-6xl font-bold mb-[1rem]"> Recents</p>
                {getFilteredMessages(messages, selectedHashtags)?.map((msg) => (
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
