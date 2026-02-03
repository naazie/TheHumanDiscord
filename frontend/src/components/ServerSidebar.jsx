import React, { useEffect } from 'react'
import { useServerStore } from '../stores/server.store.js'
import toast from 'react-hot-toast';

function ServerSidebar() {
    const servers = useServerStore((s) => s.servers);
    const activeServer = useServerStore((s) => s.activeServer);
    const loadServers = useServerStore((s) => s.loadServers);
    const setActiveServer = useServerStore((s) => s.setActiveServer);

    useEffect(() => {
        loadServers();
    }, [])
  return (
    <div className='relative'>
        <div className='h-full flex-none overflow-y-auto flex flex-col no-scrollbar bg-[#21141E] '>
            <div className="m-3 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-neutral-tertiary rounded-full bg-[#66435eb4] ">
                <span className="font-medium text-body text-violet-300">HN</span>
            </div>
            <hr className='text-[#66435eb4]' />
            {/* add the servers here */}
            {servers.map((server) => { 
                const isActive = activeServer?._id === server._id;
                return (
                <div key={server._id} 
                // onClick={toast.success("CLICK")}
                onClick={() => setActiveServer(server)} 
                className= {`m-3 z-50 pointer-events-auto relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-neutral-tertiary rounded-full bg-[#66435eb4]
                ${isActive ? 'ring-1 ring-[#d3a8c9] ring-offset-2 ring-offset-[#d3a8c9]' : ''}`}>
                    <span className="font-medium text-body  text-violet-300 ">{server.name[0]}</span>
                </div>
            )})}
        </div>
    </div>

  )
}

export default ServerSidebar