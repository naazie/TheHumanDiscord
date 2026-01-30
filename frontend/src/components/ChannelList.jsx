import React, { useEffect } from 'react'
import { useChannelStore } from '../stores/channel.store.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClover } from '@fortawesome/free-solid-svg-icons';
import { useServerStore } from '../stores/server.store.js';


function ChannelList() {
    const activeServer = useServerStore((s) => s.activeServer);
    const { channels, loadChannels, activeChannel, setActiveChannel } = useChannelStore();

    useEffect(() => {
        if (activeServer?._id) {
        loadChannels(activeServer._id);
        }
    }, [activeServer?._id]);

    return (
        // 301c2b
        <div className='relative min-h-screen w-screen content-center'>
            <div className='absolute bg-[#2b1a27] h-49/50 w-365 left-18 inset-0 mt-auto mb-auto  rounded-l-lg'>
                <div className='absolute left-0 m-2 inset-0 w-3xs flex flex-col gap-1'>
                    {activeServer && <h1 className='p-2 text-[#ffddf7] font-bold text-2xl text-center truncate'>{activeServer.name}</h1>}
                    <hr className='text-[#66435eb4]'/>
                    {channels.map((channel) => {
                        const isActive = activeChannel?._id === channel._id;
                        return (
                            <div key={channel._id} 
                            onClick={() => setActiveChannel(channel)}
                            className={`p-1 font-medium text-lg text-[#ad9ca9] text-wrap ${isActive ? 'bg-[#21151e] rounded-sm' : ''}`}>
                                <FontAwesomeIcon icon={faClover} className='mr-2  text-base ' />
                                {channel.name}
                            </div>
                        )
                    })}
                </div>
                
            </div>

        </div>
    )
}

export default ChannelList