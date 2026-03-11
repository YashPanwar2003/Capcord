"use client";

import { useState } from "react";
import Image from "next/image";
import type { Group, GroupMember, MemberRole } from "@/app/(root)/group/page";

interface GroupSidebarProps {
  groups: Group[];
  selectedGroup: Group;
  members: GroupMember[];
  onGroupChange: (group: Group) => void;
  onRoleChange: (memberId: string, newRole: MemberRole) => void;
  onRemoveMember: (memberId: string) => void;
  onAddMember: () => void;
}

const roleColors: Record<MemberRole, string> = {
  owner: "bg-pink-100 text-white",
  admin: "bg-blue-100 text-white",
  editor: "bg-orange-100 text-white",
  viewer: "bg-gray-100 text-white",
};

const roleOptions: MemberRole[] = ["admin", "editor", "viewer"];

export default function GroupSidebar({
  groups,
  selectedGroup,
  members,
  onGroupChange,
  onRoleChange,
  onRemoveMember,
  onAddMember,
}: GroupSidebarProps) {
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 border border-gray-20 rounded-20 p-4 lg:p-5 bg-white shadow-10">
      {/* Group Switcher */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-100">Current Group</h3>
        <div className="relative">
          <button
            onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            className="w-full flex items-center justify-between gap-3 py-3 px-4 border border-gray-20 rounded-18 hover:border-pink-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-pink-10 flex items-center justify-center">
                <span className="text-pink-100 font-bold text-sm">
                  {selectedGroup.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-dark-100 truncate max-w-[140px]">
                  {selectedGroup.name}
                </p>
                <p className="text-xs text-gray-100">
                  {selectedGroup.memberCount} members
                </p>
              </div>
            </div>
            <Image
              src="/assets/icons/arrow-down.svg"
              alt="Toggle"
              width={20}
              height={20}
              className={`transition-transform ${
                isGroupDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Group Dropdown */}
          {isGroupDropdownOpen && (
            <ul className="dropdown py-2 mt-1">
              {groups.map((group) => (
                <li
                  key={group.id}
                  onClick={() => {
                    onGroupChange(group);
                    setIsGroupDropdownOpen(false);
                  }}
                  className={`list-item flex items-center gap-3 ${
                    selectedGroup.id === group.id ? "bg-pink-10" : ""
                  }`}
                >
                  <div className="size-8 rounded-full bg-pink-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-100 font-bold text-xs">
                      {group.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{group.name}</p>
                    <p className="text-xs text-gray-100">
                      {group.memberCount} members
                    </p>
                  </div>
                  {selectedGroup.id === group.id && (
                    <Image
                      src="/assets/icons/check.svg"
                      alt="Selected"
                      width={16}
                      height={16}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-20" />

      {/* Member List Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-100">
          Members ({members.length})
        </h3>
        <button
          onClick={onAddMember}
          className="flex items-center gap-1.5 py-1.5 px-3 bg-pink-100 text-white rounded-4xl text-xs font-semibold hover:bg-pink-100/90 transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add
        </button>
      </div>

      {/* Member List */}
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-3 rounded-18 border border-gray-20 hover:border-pink-100/30 transition-colors group"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={36}
              height={36}
              className="rounded-full aspect-square object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark-100 truncate">
                {member.name}
              </p>
              <p className="text-xs text-gray-100 truncate">{member.email}</p>
            </div>

            {/* Role Badge / Dropdown */}
            <div className="relative">
              {member.role === "owner" ? (
                <span
                  className={`px-2.5 py-1 rounded-4xl text-xs font-medium ${roleColors[member.role]}`}
                >
                  Owner
                </span>
              ) : editingMemberId === member.id ? (
                <div className="flex items-center gap-2">
                  <select
                    value={member.role}
                    onChange={(e) => {
                      onRoleChange(member.id, e.target.value as MemberRole);
                      setEditingMemberId(null);
                    }}
                    className="text-xs py-1 px-2 border border-gray-20 rounded-lg focus:outline-pink-100"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => onRemoveMember(member.id)}
                    className="p-1 text-orange-100 hover:bg-orange-100/10 rounded"
                    title="Remove member"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingMemberId(member.id)}
                  className={`px-2.5 py-1 rounded-4xl text-xs font-medium ${roleColors[member.role]} hover:opacity-80 transition-opacity`}
                >
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
