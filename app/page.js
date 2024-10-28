'use client';

import TrendingHashtags from '@/components/trendingHashtags';
import Message from '@/components/message';
import SearchTags from '@/components/searchtags';

import { useState } from 'react';
import '@/style/layout.css';
import { useMessages } from '@/contexts/messages';
import { Button } from '@/components/ui/button';

export default function Home() {
    const { messages, loading, loadMoreMessages, hasMore } = useMessages();

    const getFilteredMessages = (messages, selectedTags) => {
        if (selectedTags.length == 0) return messages;
        return messages.filter((message) =>
            message.hashtags.some((item) => selectedTags.includes(item))
        );
    };

    const [selectedHashtags, setSelectedHashtags] = useState([]);

    const handleHashtag = (text) => {
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
            <p className='text-[#cfcfd0] ml-2'>Trending Tags...</p>
            <div className=" w-[95%] flex md:flex-row flex-col justify-between">
                <div className="trending-hashtags flex gap-2 overflow-x-auto whitespace-nowrap">
                    <TrendingHashtags
                        amount={6}
                        onClick={handleHashtag}
                        selectedHashtags={selectedHashtags}
                    />
                </div>
                <div className=" w-[90%] md:w-[30%] mx-auto">
                    <SearchTags
                        selectedTags={selectedHashtags}
                        onTagsChange={handleSearchTagsChange}
                    />
                </div>
            </div>

            <div className="messages-list">
                <p className="text-6xl font-bold mb-[1rem] mt-[1.5rem]"> Recents</p>
                {loading ? (
                    <p>Loading</p>
                ) : (
                    <div>
                        {getFilteredMessages(messages, selectedHashtags)?.map(
                            (msg) => (
                                <Message
                                    key={msg.postId}
                                    highlighted={msg.hashtags.filter(
                                        (hashtag) =>
                                            selectedHashtags.includes(hashtag)
                                    )}
                                    msgObject={msg}
                                />
                            )
                        )}

                        {hasMore ? (
                            <Button onClick={loadMoreMessages}>
                                Load More
                            </Button>
                        ) : (
                            <div>No more posts to be shown.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
