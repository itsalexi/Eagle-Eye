import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

export default function Message({ msgObject, highlighted }) {
    const { timestamp, message, comments, likes, dislikes, hashtags } =
        msgObject;

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const postDate = new Date(timestamp.seconds * 1000);
        const diffSeconds = Math.floor((now - postDate) / 1000);

        const formatUnit = (value, unit) =>
            `${value} ${unit}${value !== 1 ? 's' : ''} ago`;

        if (diffSeconds < 60) return formatUnit(diffSeconds, 'second');
        if (diffSeconds < 3600)
            return formatUnit(Math.floor(diffSeconds / 60), 'minute');
        if (diffSeconds < 86400)
            return formatUnit(Math.floor(diffSeconds / 3600), 'hour');
        if (diffSeconds < 2592000)
            return formatUnit(Math.floor(diffSeconds / 86400), 'day');
        if (diffSeconds < 31536000)
            return formatUnit(Math.floor(diffSeconds / 2592000), 'month');

        return formatUnit(Math.floor(diffSeconds / 31536000), 'year');
    };

    return (
        <div className="w-full max-w-4xl rounded-2xl mb-3 md:ml-10 ml-0 border-2 border-[#cfcfd0] p-6">
            <div className="message-top">
                <div className="mb-2">
                    <span className="text-sm text-gray-500">
                        Anonymous • {formatTimestamp(timestamp)}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {hashtags.map((tag, index) => (
                        <span
                            key={index}
                            className={`rounded-full text-xs p-2 border-2 ${
                                highlighted.includes(tag)
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-[#cfcfd0]'
                            }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
            <p className="text-gray-700 mb-4">{message}</p>

            <div className="flex items-center space-x-4 text-gray-500">
                <button className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{likes}</span>
                </button>
                <button className="flex items-center space-x-1">
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm">{dislikes}</span>
                </button>
                <button className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">{comments.length}</span>
                </button>
            </div>
        </div>
    );
}
