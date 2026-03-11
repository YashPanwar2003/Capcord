"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { daysAgo } from '@/lib/utils';

const VideoDetailHeader = ({ title, createdAt, username, userImg, videoId, ownerId, visibility, thumbnailUrl }: VideoDetailHeaderProps) => {
    const [copied, setCopied] = useState<boolean>(false)
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const user = session?.user;
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/video/${videoId}`)
        setCopied(true)

    }
    useEffect(() => {
        const changeChecked = setTimeout(()=>{
            if(copied){
                setCopied(false)
            }
        },2500)
        return ()=>clearTimeout(changeChecked)
    }, [copied])
    return (
        <header className='detail-header'>
            <aside className='user-info'>

                <h1>{title}</h1>
                <figure>
                    <button
                        onClick={() => router.push(`/profile/${user?.id}`)}
                    >
                        <Image src={userImg ?? ""} alt='user'
                            width={30}
                            height={30}
                            className='rounded-full'
                        />
                        <h2> {username ?? "Guest"}</h2>
                    </button>
                    <figcaption>
                        <span className='mt-1'>
                             {"   "}  ○  {"   "}
                        </span>
                        <p>{daysAgo(createdAt)}</p>
                    </figcaption>
                </figure>
                <aside className='cta'>
                    <button onClick={handleCopyLink}>

                        <Image src={copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"}
                            alt='link'
                            height={24}
                            width={24}
                        />
                    </button>

                </aside>
            </aside>


        </header>
    )
}

export default VideoDetailHeader