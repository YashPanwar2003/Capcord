"use client"


import { ICONS } from '@/constants'
import { useScreenRecording } from '@/lib/hooks/useScreenRecording'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const RecordScreen = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const {
        resetRecording,
        stopRecording,
        startRecording,
        isRecording,
        recordedBlob,
        recordedVideoUrl,
        recordingDuration,
    } = useScreenRecording()
    const closeModal = () => {
        resetRecording()
        setIsOpen(false)

    }
    const handleStart = async () => {
        await startRecording();
    }
    const recordAgain = async () => {
        resetRecording();
        await startRecording()
        if (recordedVideoUrl && videoRef.current) {
            videoRef.current.src = recordedVideoUrl;
        }
    }
    const goToUpload = async()=>{
        if(!recordedBlob){
            return;
        }
        const url = URL.createObjectURL(recordedBlob)
        sessionStorage.setItem("recordedVideo",JSON.stringify({
            url,
            name:"screen-recording.webm",
            type:recordedBlob.type,
            size:recordedBlob.size,
            duration:recordingDuration || 0,
        }))
      router.push("/upload")
      closeModal()

    }
    return (
        <div className="record">
            <button className="primary-btn"
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                <Image src={ICONS.record} alt="Record" width={16} height={16} />
                <span>Record</span>

            </button>
            {isOpen && (
                <section className='dialog'>
                    <div className='overlay-record'/>
                        <div className='dialog-content'>
                            <figure>
                                <h3>Screen Recording</h3>
                                <button onClick={() => closeModal()}>
                                    <Image src={ICONS.close} alt='close' width={20} height={20} />
                                </button>
                            </figure>
                            <section>
                                {isRecording ? (
                                    <article>
                                        <div/>
                                        <span>Recording in progress</span>
                                    </article>
                                ) : (
                                    recordedVideoUrl ? (
                                        <video ref={videoRef} src={recordedVideoUrl} controls/>
                                    ) : (
                                        <p>Click record to start capturing</p>
                                    )
                                )}
                            </section>

                            <div className='record-box'>
                                  {!isRecording && !recordedVideoUrl &&(
                                    <button
                                    className='record-start'
                                    onClick={ handleStart}
                                    >
                                     <Image src={ICONS.record}
                                     alt='record'
                                     height={16}
                                     width={16}
                                     />
                                     Record
                                    </button>
                                  )}
                                  {isRecording && (
                                    <button
                                    className='record-stop'
                                    onClick={ stopRecording}
                                    >
                                     <Image src={ICONS.record}
                                     alt='record'
                                     height={16}
                                     width={16}
                                     />
                                     Stop Recording
                                    </button>
                                  )}
                                  {
                                    recordedVideoUrl && (
                                        <>
                                        <button
                                        className='record-again'
                                        onClick={recordAgain}>
                                            Record Again
                                        </button>
                                        <button
                                        onClick={goToUpload}
                                        className='record-upload'
                                        >
                                         <Image src={ICONS.upload}
                                         alt='upload'
                                         height={16}
                                         width={16}
                                         />
                                         Continue to upload
                                        </button>
                                        </>
                                    )
                                  }
                            </div>

                        </div>
                   
                </section>
            )}
        </div>
    )
}

export default RecordScreen