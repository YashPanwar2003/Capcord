"use client";

import { useState } from "react";
import Image from "next/image";
import type { MemberRole } from "@/app/(root)/group/page";

interface AddMemberModalProps {
  onClose: () => void;
  onAdd: (email: string, role: MemberRole) => void;
}

const roleOptions: { value: MemberRole; label: string; description: string }[] =
  [
    {
      value: "admin",
      label: "Admin",
      description: "Can manage members and settings",
    },
    {
      value: "editor",
      label: "Editor",
      description: "Can upload and edit videos",
    },
    {
      value: "viewer",
      label: "Viewer",
      description: "Can only view videos",
    },
  ];

export default function AddMemberModal({ onClose, onAdd }: AddMemberModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberRole>("viewer");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    onAdd(email, role);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-dark-100/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-20 p-6 shadow-lg w-full max-w-md z-10 mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-dark-100">Add New Member</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-20 transition-colors"
          >
            <Image
              src="/assets/icons/close.svg"
              alt="Close"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter member's email"
              className={error ? "border-orange-100" : ""}
            />
            {error && (
              <p className="text-xs text-orange-100 mt-1">{error}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-gray-100 text-base font-medium">
              Select Role
            </label>
            <div className="flex flex-col gap-2">
              {roleOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-3 p-3 rounded-18 border cursor-pointer transition-colors ${
                    role === option.value
                      ? "border-pink-100 bg-pink-10"
                      : "border-gray-20 hover:border-pink-100/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={role === option.value}
                    onChange={(e) => setRole(e.target.value as MemberRole)}
                    className="mt-0.5 accent-pink-100"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-dark-100">
                      {option.label}
                    </span>
                    <span className="text-xs text-gray-100">
                      {option.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-5 border border-gray-25 rounded-4xl text-sm font-semibold text-dark-100 hover:bg-gray-20/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-5 bg-pink-100 rounded-4xl text-sm font-semibold text-white hover:bg-pink-100/90 transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
