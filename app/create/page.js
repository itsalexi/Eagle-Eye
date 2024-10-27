'use client';
import React, { useState } from 'react';
import SearchTags from '@/components/searchtags';
import { Textarea } from '@/components/ui/textarea';
import '@/style/layout.css';
import TrendingHashtags from '@/components/trendingHashtags';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, serverTimestamp } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import LoginBox from '@/components/login';

export default function Create() {
    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const [textContent, setTextContent] = useState('');
    const [user] = useAuthState(auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const { toast } = useToast();

    const createMessage = async (e) => {
        e.preventDefault();

        if (!textContent.trim()) {
            toast({
                title: 'Error',
                description: 'Message content cannot be empty',
                variant: 'destructive',
            });
            return;
        }

        if (!user) {
            toast({
                title: 'Error',
                description: 'You must be logged in to post',
                variant: 'destructive',
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const ref = firestore.collection('messages');
            const newMessage = {
                message: textContent.trim(),
                hashtags: selectedHashtags,
                timestamp: serverTimestamp(),
                comments: [],
                likes: 0,
                dislikes: 0,
            };

            await ref.add(newMessage);

            setTextContent('');
            setSelectedHashtags([]);

            toast({
                title: 'Success',
                description: 'Message posted successfully!',
            });
            router.push('/');
        } catch (error) {
            console.error('Error creating message:', error);
            toast({
                title: 'Error',
                description: 'Failed to create post. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSearchTagsChange = (newTags) => {
        setSelectedHashtags(newTags);
    };

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

    return user ? (
        <div className="front-create">
            <div className="create-title">Create Post</div>
            <div className="tags">
                <p>Add Tags...</p>
                <div className="trending-tags">
                    <div className="trending-hashtags">
                        <TrendingHashtags
                            amount={6}
                            onClick={handleHashtag}
                            selectedHashtags={selectedHashtags}
                        />
                    </div>
                    <div className="search-create">
                        <SearchTags
                            selectedTags={selectedHashtags}
                            onTagsChange={handleSearchTagsChange}
                        />
                    </div>
                </div>
            </div>
            <div className="messeage-create">
                <Textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="h-full"
                    disabled={isSubmitting}
                />
            </div>
            <div className="post-create">
                <Button
                    onClick={createMessage}
                    className="rounded-full float-right m-[0.5rem] px-4 py-2 border-2 $ bg-black text-white border-black"
                >
                    {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
            </div>
        </div>
    ) : (
        <div className="login-page">
            <LoginBox />
        </div>
    );
}
