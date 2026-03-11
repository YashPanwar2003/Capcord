import { getVideoById } from "@/actions/video";
import VideoDetailHeader from "@/components/VideoDetailHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { redirect } from "next/navigation";

const Player = async ({ params }: Params) => {
    const { videoId } = await params;
    const { user, video } = await getVideoById(videoId);
    if (!video) redirect("/404")
    return (
        <main className="wrapper-lg page">
            <VideoDetailHeader
            {...video}
            userImg={user?.image}
            ownerId={video.userId}
            username={user?.name}
            />
            <section className="video-details">
                <div className="content">
                    <VideoPlayer
                        videoId={video.videoId}
                    />
                </div>
            </section>
        </main>

    )
}
export default Player; 