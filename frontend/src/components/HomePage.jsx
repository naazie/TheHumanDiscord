import React from 'react'
import ServerSidebar from './ServerSidebar'
import ChannelList from './ChannelList'
import ChatInterface from './ChatInterface'
import UsersList from './UsersList'

function HomePage() {
  return (
    <div className="flex min-h-screen w-screen bg-[#21141E]">
        <ServerSidebar/>
        <ChannelList className="z-0"/>
        <ChatInterface className="z-1"/>
        <UsersList/>
    </div>
  )
}

export default HomePage