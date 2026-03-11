import { createIframeLink } from "@/lib/utils";

export default function VideoPlayer({videoId}:VideoPlayerProps){
    return(
        <div className="video-player">
            <iframe src={createIframeLink(videoId)} loading="lazy"
        title="Video Player"
        style={{
            border:0,
            zIndex:50
        }}
        allowFullScreen
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        ></iframe>
        </div>
    )
}