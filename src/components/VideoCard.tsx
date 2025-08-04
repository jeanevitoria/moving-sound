import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

interface VideoCardProps {
    videos: string[]
}

const VideoCard: React.FC<VideoCardProps> = ({ videos }) => {
    const [embedUrl, setEmbedUrl] = useState<string>();

    useEffect(() => {
        const ids: string[] = [];

        videos.forEach((video) => {
            if (video.trim()) {
                const id = video.split('=')
                ids.push(id[1]);
            }
        })

        setEmbedUrl(`http://www.youtube.com/embed/${ids[0]}?autoplay=1&playlist=${ids.join(',')}`)
    }, [videos]);

    return (
            <Paper elevation={5}
                sx={{
                    display: 'flex',
                    zIndex: 100,
                    backgroundColor: 'transparent',
                    paddingY: '10px',
                    paddingX: '10px',
                    marginX: 'auto',
                    flexDirection: 'column',
                    width: { xs: '95%', md: '95%' },
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