"use client";

import { useUser, useClerk, SignInButton } from "@clerk/nextjs";
import { useState } from "react";
import { LogOut, User } from "lucide-react";

export default function AuthSection() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="p-4 border-t border-border">
        <SignInButton mode="modal">
          <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "User"}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User size={16} className="text-primary-foreground" />
          </div>
        )}
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-foreground">
            {user?.fullName || user?.emailAddresses?.[0]?.emailAddress || "User"}
          </div>
          <div className="text-xs text-muted-foreground">
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
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-popover border border-border rounded-md shadow-lg z-20">
            <button
              onClick={() => {
                signOut();
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-2 p-3 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
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