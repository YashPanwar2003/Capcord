import {  getAllVideosByUser } from "@/actions/video";
import Header from "@/components/Header";
import { ParamsWithSearch } from "@/constants";
import { redirect } from "next/navigation"
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";

interface ProfilePageProps {
    params: {
        id: string;
    }
}
const ProfilePage = async ({ params,searchParams }: ParamsWithSearch) => {

    const userId = (await params).id;
    const {query,filter} = (await searchParams)
    const {user,videos}= await getAllVideosByUser(userId,query,filter)
    console.log(user)
    if(!user) {
        redirect("/404")
    }

    return (
        <div className="wrapper page" >

            <Header subHeader={user?.email || ""} title={user?.name || ""} userImg={user?.image ? user?.image : "/assets/images/dummy.jpg"} />
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
                title="No videos Available yet"
                 description="Videos will showup once you upload them."
                />
            )}
        </div>
    )



}

export default ProfilePage;