"use client";

import type { Group } from "@/app/(root)/group/page";

interface GroupHeaderProps {
  group: Group;
  memberCount: number;
}

export default function GroupHeader({ group, memberCount }: GroupHeaderProps) {
  return (
    <div className="flex flex-col gap-4 p-5 lg:p-6 border border-gray-20 rounded-20 bg-white shadow-10">
      {/* Group Title and Avatar */}
      <div className="flex items-start gap-4">
        <div className="size-14 lg:size-16 rounded-20 bg-pink-10 flex items-center justify-center flex-shrink-0">
          <span className="text-pink-100 font-bold text-xl lg:text-2xl">
            {group.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-dark-100 -tracking-[1px]">
            {group.name}
          </h1>
          <p className="text-sm text-gray-100 mt-1 line-clamp-2">
            {group.description}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-4 lg:gap-6 pt-4 border-t border-gray-20">
        <div className="flex items-center gap-2">
          <svg
            className="text-gray-100"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          <span className="text-sm font-medium text-dark-100">
            {memberCount} members
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="text-gray-100"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-sm font-medium text-dark-100">
            Created{" "}
            {group.createdAt.toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
