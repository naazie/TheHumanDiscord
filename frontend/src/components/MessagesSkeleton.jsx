import MessageSkeleton from "./MessageSkeleton.jsx";
import React from "react";

// MessageSkeleton

function MessagesSkeleton() {
  return (
    <div className="px-6 py-4 h-[75%] overflow-hidden animate-pulse">
      <div className="space-y-4">
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    </div>
  );
}

export default MessagesSkeleton