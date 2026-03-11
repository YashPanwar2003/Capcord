"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GroupVideo } from "@/app/(root)/group/page";
import EmptyState from "@/components/EmptyState";

interface GroupVideoGridProps {
  videos: GroupVideo[];
  onDeleteVideo?: (videoId: string) => void;
}

export default function GroupVideoGrid({ videos, onDeleteVideo }: GroupVideoGridProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<GroupVideo | null>(null);
  const [confirmText, setConfirmText] = useState("");

  const handleDeleteClick = (video: GroupVideo) => {
    setVideoToDelete(video);
    setDeleteDialogOpen(true);
    setConfirmText("");
  };

  const handleConfirmDelete = () => {
    if (confirmText === "confirm" && videoToDelete && onDeleteVideo) {
      onDeleteVideo(videoToDelete.id);
      setDeleteDialogOpen(false);
      setVideoToDelete(null);
      setConfirmText("");
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setVideoToDelete(null);
    setConfirmText("");
  };

  if (videos.length === 0) {
    return (
      <EmptyState
        icon="/assets/icons/video.svg"
        title="No videos in this group"
        description="Videos shared with this group will appear here"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-dark-100 -tracking-[0.5px]">
          Shared Videos ({videos.length})
        </h2>
      </div>

      <section className="video-grid">
        {videos.map((video) => (
          <GroupVideoCard 
            key={video.id} 
            video={video} 
            onDelete={() => handleDeleteClick(video)}
          />
        ))}
      </section>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && videoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-200 border border-gray-100 rounded-3xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <Image
                  src="/assets/icons/delete.svg"
                  alt="delete"
                  width={24}
                  height={24}
                  className="opacity-90"
                />
              </div>
              <h3 className="text-xl font-bold text-dark-100">Delete Video</h3>
            </div>

            <p className="text-gray-100 mb-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-dark-100">
                {videoToDelete.title}
              </span>
              ?
            </p>
            <p className="text-gray-100 text-sm mb-4">
              This action cannot be undone. Type{" "}
              <span className="font-mono bg-dark-300 px-2 py-0.5 rounded text-pink-100">
                confirm
              </span>{" "}
              to proceed.
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type 'confirm' to delete"
              className="w-full px-4 py-3 bg-dark-300 border border-gray-100 rounded-xl text-dark-100 placeholder:text-gray-100 focus:outline-none focus:border-pink-100 mb-4"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-3 bg-dark-300 border border-gray-100 rounded-xl text-dark-100 font-medium hover:bg-dark-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={confirmText !== "confirm"}
                className="flex-1 px-4 py-3 bg-red-500 rounded-xl text-white font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface GroupVideoCardProps {
  video: GroupVideo;
  onDelete: () => void;
}

function GroupVideoCard({ video, onDelete }: GroupVideoCardProps) {
  return (
    <div className="video-card group">
      <Link href={`/video/${video.id}`}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={290}
          height={180}
          className="thumbnail"
        />
        <article>
          <div>
            <figure>
              <Image
                src={video.userImage}
                alt={video.username}
                height={34}
                width={34}
                className="rounded-full aspect-square"
              />
              <figcaption>
                <h3>{video.username}</h3>
                <p>shared</p>
              </figcaption>
            </figure>
            <aside>
              <Image
                src="/assets/icons/eye.svg"
                alt="views"
                height={16}
                width={16}
              />
              <span>{video.views}</span>
            </aside>
          </div>
          <h2>
            {video.title} -{" "}
            {video.createdAt.toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h2>
        </article>

        {video.duration && (
          <div className="duration">{Math.ceil(video.duration / 60)} min</div>
        )}
      </Link>
      
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDelete();
        }}
        className="delete-btn absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
        title="Delete video"
      >
        <Image src="/assets/icons/delete.svg" alt="delete" width={16} height={16} />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(`/video/${video.id}`);
        }}
        className="copy-btn"
      >
        <Image src="/assets/icons/link.svg" alt="copy" width={20} height={20} />
      </button>
    </div>
  );
}
