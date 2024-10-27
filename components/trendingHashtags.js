import { useMessages } from '@/contexts/messages';
import Hashtag from './hashtag';

export default function TrendingHashtags({ selectedHashtags, onClick }) {
    const { trendingHashtags, loading } = useMessages();

    return loading ? (
        <div>Loading</div>
    ) : (
        <>
            {trendingHashtags.map((hashtag) => (
                <Hashtag
                    onClick={onClick}
                    key={`${hashtag}_hashtag`}
                    text={`${hashtag}`}
                    isSelected={selectedHashtags?.includes(hashtag)}
                />
            ))}
        </>
    );
}
