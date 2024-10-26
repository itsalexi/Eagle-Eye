import Hashtag from './hashtag';

export default function TrendingHashtags({
    messages,
    amount,
    selectedHashtags,
    onClick,
}) {
    console.log(selectedHashtags);

    const getTopTrendingHashtags = (messages, amount) => {
        const hashtagCounts = {};

        messages.forEach((msg) => {
            msg.hashtags.forEach((tag) => {
                hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
            });
        });
        const trendingHashtags = Object.entries(hashtagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, amount)
            .map((entry) => entry[0]);

        return trendingHashtags;
    };

    const trending_hashtags = getTopTrendingHashtags(messages, amount);

    return (
        <>
            {trending_hashtags.map((hashtag) => (
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
