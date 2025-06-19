"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function AuthSection() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="p-4 border-t border-[#27272a]">
        <Link href="/sign-in">
          <button className="w-full bg-[#fafafa] text-[#18181b] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#fafafa]/90 transition-colors">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-[#27272a] relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#27272a]/50 transition-colors"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "User"}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#fafafa] flex items-center justify-center">
            <User size={16} className="text-[#18181b]" />
          </div>
        )}
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-[#fafafa]">
            {user?.fullName ||
              user?.emailAddresses?.[0]?.emailAddress ||
              "User"}
          </div>
          <div className="text-xs text-[#a1a1aa]">
            {user?.emailAddresses?.[0]?.emailAddress}
          </div>
        </div>
      </button>

      {showDropdown && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#0a0a0a] border border-[#27272a] rounded-md shadow-lg z-20">
            <button
              onClick={() => {
                signOut();
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-2 p-3 text-sm text-[#fafafa] hover:bg-[#27272a]/50 rounded-md transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
