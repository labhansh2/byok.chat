import React from "react";

export default function ThreadTilesSkeleton() {
  return (
    <div className="space-y-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-full p-2 rounded-md border border-transparent animate-pulse"
        >
          <div className="h-5 bg-accent/50 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
} 