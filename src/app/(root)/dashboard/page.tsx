import { getAllVideos } from "@/actions/video";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import sampleVideos from "@/constants/dummydata";


export default async function Dashboard({searchParams}:SearchParams){

  const{query,filter,page} = await searchParams;
  const {videos,pagination}=await getAllVideos(query || "",filter,Number(page) || 1 )
    return(
        <main className="wrapper page">
            <Header title="All Videos" subHeader="Public Library"/>
            {videos?.length>0 ? (
                <section className="video-grid">
                    {videos.map(({video,user})=>(
                        <VideoCard key={video.id} {...video} userImage={user?.image || ""}
                        username={user?.name || "Guest"}
                        thumbnail={video.thumbnailUrl}
                        duration={video.duration || 0}
                        />
                    ))}
                </section>
            ):(
                <EmptyState icon="/assets/icons/video.svg"
                title="No videos Found"
                 description="Try adjusting your search"
                />
            )}
        </main>
    )
}