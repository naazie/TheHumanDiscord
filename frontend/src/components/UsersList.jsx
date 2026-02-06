import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeoplePulling } from '@fortawesome/free-solid-svg-icons';
import { usePresenceStore } from '../stores/presence.store';
import { useAuth } from '../context/AuthContext';
import { getAllUsers } from './service/user.service';
import { useServerStore } from '../stores/server.store.js';

function UsersList() {
    const [isOpen, setIsOpen] = useState(false);
    // const [allUsers, setAllUsers] = useState([]);
    const {user} = useAuth();
    const username = localStorage.getItem("username");
    const activeServer = useServerStore(s => s.activeServer);
    // const members = useServerStore(s => s.getMembers(activeServer?._id));
    const loadMembers = useServerStore(s => s.loadMembers);
    const membersByServer = useServerStore(s => s.membersByServer);
    const members = membersByServer[activeServer?._id] ?? [];

    const onlineUsers = usePresenceStore((s) => s.onlineUsers);
    const isOnline = onlineUsers.has(user.user.id);

    useEffect(() => {
        if(activeServer?._id)
        {
            console.log()
            loadMembers(activeServer._id);
            // console.log(Array.isArray(members), members); // true
            // console.log(typeof members[0]._id); // "string" 
        }
    }, [activeServer?._id]);

    // useEffect(() => {
    //     console.log("members updated:", members);
    // }, [members]);  

    const sortedUsers = [...members].sort((a, b) => {
        const aOnline = onlineUsers.has(a._id);
        const bOnline = onlineUsers.has(b._id);
        if (aOnline === bOnline) return 0;
        return aOnline ? -1 : 1;
    });

    const handleTyping = () => {
        if(!isTypingRef.current)
        {
            
        }
    }

  return (
    <div className={`mr-2 relative h-full min-w-0 flex-none bg-[#2b1a27] border-l border-[#66435eb4] transition-all duration-300 ease-in-out ${isOpen ? 'w-50' : 'w-16'}`}>
        <div 
        className='h-11 flex items-center justify-center  border-[#66435eb4] cursor-pointer hover:bg-[#352230] transition-colors'
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Collapse Member List" : "Expand Member List"}>
            {isOpen ? 
                <h1 className='p-2 m-4 text-[#ffddf7] font-medium text-xl truncate'>
                    <FontAwesomeIcon icon={faPeoplePulling} /> Members
                </h1>
            :
                <h1 className='p-2 m-4 text-[#ffddf7] font-medium text-lg truncate'>
                    <FontAwesomeIcon icon={faPeoplePulling} />
                </h1>
            }
        </div>
        <hr className='text-[#66435eb4]'/>
        <div className="m-4 flex flex-col gap-3">
            {/* Current User */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-[#66435eb4] flex items-center justify-center text-white font-semibold">
                    {username[0].toUpperCase()}
                    </div>
                    <span
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-zinc-900
                        ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
                    />
                </div>
                {isOpen && <span className="text-sm text-zinc-200 truncate">{username} (You)</span>}
            </div>

            {/* Other Users */}
            
            <div className="flex flex-col gap-2">
                {sortedUsers.filter(u => u._id !== user.user.id).map((u) => {
                    const userIsOnline = onlineUsers.has(u._id);
                    return (
                        <div key={u._id} className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-8 w-8 rounded-full bg-[#66435eb4] flex items-center justify-center text-white font-semibold text-sm">
                                {u.username[0].toUpperCase()}
                                </div>
                                <span
                                className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-zinc-900
                                    ${userIsOnline ? "bg-green-500" : "bg-gray-400"}`}
                                />
                            </div>
                            {isOpen && (
                                <span className="text-sm text-zinc-200 truncate">{u.username}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

    </div>
  )
}

export default UsersList