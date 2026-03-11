"use client";

import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "@/actions/video";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_VIDEO_SIZE, Visibility } from "@/constants";
import useFileInput from "@/lib/hooks/useFileInput";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";



const uploadFileToBunny = async(file:File,uploadUrl:string,accessKey:string):Promise<void> =>{
    return fetch(uploadUrl,{
        method:"PUT",
        headers:{
            'Content-Type':file.type,
           AccessKey:accessKey
        },
        body:file,

    }).then((response)=>{
        if(!response.ok) throw new Error("Upload failed")
    })
}

export default function Page() {

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [videoDuration ,setVideoDuration]=useState<number>(0)
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        visibility: Visibility;
    }>({
        title: "",
        description: "",
        visibility: "public",
    });

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail = useFileInput(MAX_VIDEO_SIZE);
    const router = useRouter()
    useEffect(()=>{
        if(video.duration !== null || 0){
            setVideoDuration(video.duration)

        }
    },[video.duration])
    useEffect(()=>{
        const checkForRecordedVideo = async()=>{
            try{
            const stored = sessionStorage.getItem("recordedVideo")
            if(!stored){
                return;
            }
            const {url,name,type,duration}= JSON.parse(stored);
            const blob = await fetch(url).then(res=>res.blob())
            const file = new File([blob],name,{type,lastModified:Date.now()})
            if(video.inputRef.current){
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                video.inputRef.current.files= dataTransfer.files

                const event = new Event('change',{bubbles:true})
                video.inputRef.current.dispatchEvent(event)

                video.handleFileChange({
                    target:{files:dataTransfer.files}
                } as ChangeEvent<HTMLInputElement>) 

                if(duration){
                    setVideoDuration(duration)
                }
                sessionStorage.removeItem("recordedVideo")
                URL.revokeObjectURL(url)
            }
            }catch(err){
                console.error(err,"Errro loading  video")

            }
        }
        checkForRecordedVideo()
    },[video])
    
    const handleInputChange: React.ChangeEventHandler<
        HTMLInputElement> = (e) => {
            const { name, value } = e.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            if (!video.file || !thumbnail.file) {
                setError("Please Upload video and thumbnail")
                return;

            }
            if (!formData.title || !formData.description) {
                setError("Please fill in all the details")
                return;
            }
            //step 0 :  Get upload url

            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccessKey
            } = await getVideoUploadUrl()
            if(!videoUploadUrl || !videoAccessKey){
                throw new Error("Failed to get video upload credentials")

            }

            //step 1 : Upload the video to bunny
            await uploadFileToBunny(video.file,videoUploadUrl,videoAccessKey);

            //step 2 : get url for  the thumbnail

            const {
              uploadUrl:thumbnailUploadUrl,
              accessKey:thumbnailAccessKey,
              cdnUrl:thumbnailCdnUrl,

            } = await getThumbnailUploadUrl(videoId as string)
             
            if(!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey) throw new Error("Failed to get thumbnail upload credentials")

                //step 3 : upload the thumbnail to the bunny
            await uploadFileToBunny(thumbnail.file,thumbnailUploadUrl,thumbnailAccessKey)
            //Create a new DB entry for the video details
            await saveVideoDetails({
                videoId,
                thumbnailUrl:thumbnailCdnUrl,
                ...formData,
                 duration:videoDuration,

            })

            router.push(`/dashboard`);


        } catch (err) {
            console.log(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="wrapper-md upload-page">
            <h1>Upload a video</h1>

            {error && (
                <div className="error-field">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">

                <FormField
                    id="title"

                    label="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear and concise video title"
                />

                <FormField
                    id="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    as="textarea"
                    placeholder="Describe what video is about"
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type="video"
                />
                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    type="image"
                />

                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    as="select"
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                    ]}
                    onChange={handleInputChange}
                />
                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? "Uploading ...." : "Upload video"}
                </button>

            </form>
        </div>
    );
}