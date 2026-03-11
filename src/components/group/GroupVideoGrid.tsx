"use client";

import Image from "next/image";
import Link from "next/link";
import type { GroupVideo } from "@/app/(root)/group/page";
import EmptyState from "@/components/EmptyState";

interface GroupVideoGridProps {
  videos: GroupVideo[];
}

export default function GroupVideoGrid({ videos }: GroupVideoGridProps) {
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
          <GroupVideoCard key={video.id} video={video} />
        ))}
      </section>
    </div>
  );
}

function GroupVideoCard({ video }: { video: GroupVideo }) {
  return (
    <div className="video-card">
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
