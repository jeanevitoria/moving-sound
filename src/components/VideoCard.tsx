import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface id {
    kind: string,
    videoId: string
}

interface Item {
    etag: string,
    id: id,
    kind: string,
    snippet: Snippet
}

interface Snippet {
    channelId: string,
    channelTitle: string,
    description: string,
    title: string
}


interface VideoCardProps {
    videos: Map<string, Item[]>
}

const VideoCard: React.FC<VideoCardProps> = ({ videos }) => {
    const [videosId, setVideosId] = useState<string[]>([]);
    const [firstVideo, setFirstVideo] = useState<string>();
    const [playlist, setPlaylist] = useState<string>();
    const [embedUrl, setEmbedUrl] = useState<string>();

    useEffect(() => {
        const ids: string[] = [];

        Array.from(videos).forEach(([, items]) => {
            items.forEach((item) => {
                ids.push(item.id.videoId);
            });
        });

        setEmbedUrl(`https://www.youtube.com/embed/${ids[0]}?autoplay=1&playlist=${ids.slice(1).join(',')}`)
    }, [videos]);

    useEffect(() => {
        console.log(embedUrl)
    }, [embedUrl]);

    return (
        <Paper elevation={5}
            sx={{
                display: 'flex',
                backgroundColor: 'transparent',
                paddingTop: '15px',
                paddingBottom: '10px',
                paddingX: '10px',
                flexDirection: 'column',
                width: { xs: '95%', md: '600px' },
                height: { xs: '250px', md: '350px' }
            }}>
            {embedUrl && (
                <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
        </Paper>
    )
}

export default VideoCard;