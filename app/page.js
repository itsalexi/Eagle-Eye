import { SearchX } from 'lucide-react';
import Image from 'next/image';
import Hashtag from '@/components/hashtag'

export default function Home() {
    return (
        <div className='flex flex-row ml-10'>
            <Hashtag text="#Freedom" />
            <Hashtag text="#Justice" />
            <Hashtag text="#Education" />
            <Hashtag text="#growth" />
            <Hashtag text="#future" />
            <Hashtag text="#colloboration" />
        </div>
    );
}
