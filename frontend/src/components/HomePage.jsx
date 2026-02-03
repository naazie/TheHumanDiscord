import React from 'react'
import ServerSidebar from './ServerSidebar'
import ChannelList from './ChannelList'
import ChatInterface from './ChatInterface'
import UsersList from './UsersList'
import { usePresenceSocket } from '../hooks/usePresenceSocket'

function HomePage() {
  usePresenceSocket();
  return (
    <div className="flex h-screen w-screen bg-[#21141E] overflow-hidden">
        <ServerSidebar/>
        <ChannelList className="z-0"/>
        <ChatInterface className="z-1"/>
        <UsersList/>
    </div>
  )
}

export default HomePage