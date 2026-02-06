import React from 'react'

function MessageSkeleton() {
  return (
    <div className="flex gap-3 py-2 animate-pulse">
      {/* avatar */}
      <div className="w-10 h-10 rounded-full bg-[#73616e8d] flex-shrink-0" />

      {/* text */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/4 bg-[#73616e5c] rounded" />
        <div className="h-7 w-3/4 bg-[#73616e5c] rounded" />
        <div className="h-15 w-1/2 bg-[#73616e5c] rounded" />
      </div>
    </div>
  )
}

export default MessageSkeleton
