'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trendingHashtags, setTrendingHashtags] = useState([]);

    const calculateTrendingHashtags = (msgs, amount = 6) => {
        const hashtagCounts = {};
        msgs.slice(0, 25).forEach((msg) => {
            msg.hashtags.forEach((tag) => {
                hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(hashtagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, amount)
            .map((entry) => entry[0]);
    };

    const fetchInitialMessages = async () => {
        try {
            setLoading(true);

            const messagesRef = db.collection('messages');
            const q = messagesRef.orderBy('timestamp', 'desc').limit(10);

            const snapshot = await q.get();

            const fetchedMessages = [];
            snapshot.forEach((doc) => {
                fetchedMessages.push({ id: doc.id, ...doc.data() });
            });

            setMessages(fetchedMessages);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setTrendingHashtags(calculateTrendingHashtags(fetchedMessages));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setLoading(false);
        }
    };

    const loadMoreMessages = async () => {
        if (!lastVisible) return;

        try {
            const messagesRef = db.collection('messages');
            const q = messagesRef
                .orderBy('timestamp', 'desc')
                .startAfter(lastVisible)
                .limit(10);

            const snapshot = await q.get();

            const newMessages = [];
            snapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data() });
            });

            setMessages([...messages, ...newMessages]);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        } catch (error) {
            console.error('Error loading more messages:', error);
        }
    };

    useEffect(() => {
        fetchInitialMessages();
    }, []);
    return (
        <MessagesContext.Provider
            value={{
                messages,
                loading,
                trendingHashtags,
                loadMoreMessages,
                hasMore: !!lastVisible,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
}
