"use client"
import { Visibility } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export interface VideoCardProps {
    id: string;
    title: string;
    thumbnail: string;
    createdAt: Date;
    userImage: string;
    username: string;
    views: number;
    visibility: Visibility;
    duration: number;
}


const VideoCard: React.FC<VideoCardProps> = ({
    id,
    title,
    thumbnail,
    createdAt,
    userImage,
    username,
    views,
    visibility,
    duration,
}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <div className="video-card">
            <Link href={`/video/${id}`} >
            <Image src={thumbnail} alt="thumbnail" width={290} height={180} className="thumbnail" />
            <article>
                <div>
                    <figure>
                        <Image src={userImage} alt="avatar" height={34} width={34} className="rounded-full aspect-square" />
                        <figcaption>
                            <h3>{username} </h3>
                            <p>{visibility}</p>
                        </figcaption>
                    </figure>
                    <aside>
                        <Image src="/assets/icons/eye.svg" alt="views"
                        height={16 }
                        width={16}
                        />
                        <span>{views}</span>
                    </aside>
                </div>
                <h2>
                    {title} - {" "} { createdAt.toLocaleDateString('en-us',{
                        year:"numeric",
                        month:"short",
                        day:"numeric"
                    })}
                </h2>

            </article>
            
            {duration && (
                <div className="duration">
                    {Math.ceil(duration/60)} min    
                </div>
            )}
        </Link>
        <button onClick={(e)=>{
                e.stopPropagation()
                navigator.clipboard.writeText(`/video/${id}`)
                
            }} className="copy-btn">
                <Image src="/assets/icons/link.svg" alt="copy" width={20}
                height={20}/>
            </button>
        </div>
    )
}

export default VideoCard;