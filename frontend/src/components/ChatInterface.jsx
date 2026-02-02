import React, { useEffect, useState } from 'react';
import { useMessageStore } from '../stores/message.store';
import { useChannelStore } from '../stores/channel.store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from 'react-hot-toast';
import { faClover } from '@fortawesome/free-solid-svg-icons';
import { useSocket } from '../context/SocketContext';
import { useChannelSocket } from '../hooks/useChannelSocket';
import { useMessageSocket } from '../hooks/messageSocket';

function ChatInterface() {
    const {messages, activeMessage, loadMessages, setActiveMessage } = useMessageStore();
    const {sendMessageSocket} = useMessageSocket();
    const activeChannel = useChannelStore((s) => s.activeChannel);
    useEffect(() => {
        if(activeChannel?._id) {
            loadMessages(activeChannel._id);
        }
    }, [activeChannel?._id])

    useEffect(() => {
        const el = document.getElementById("messages-end");
        el?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const addMessage = useMessageStore((s) => s.addMessage);

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if(!activeChannel?._id || !message.trim()) {
                setLoading(false);
                return;
            }
            // await addMessage(activeChannel?._id, message);
            sendMessageSocket(activeChannel?._id, message);
            setMessage("");
            requestAnimationFrame(() => {
                const ta = document.querySelector("textarea");
                if (ta) ta.style.height = "44px";
            });
        } catch (error) {
            toast.error("Error Sending Message", error.message );
        }
        finally {
            setLoading(false);
        }
    }

    function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const isToday =
        date.toDateString() === now.toDateString();

    return isToday
        ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : date.toLocaleDateString([], {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // Sockets 
    // const channelId = activeChannel?._id; 
    useChannelSocket({channelId: activeChannel?._id});

  return (
    <div className='relative min-h-screen min-w-296 content-center'>
        <div className='absolute bg-[#2b1a27] h-49/50 inset-0 m-auto border-l-2 border-[#66435eb4] left-0 flex flex-col'>
            {activeChannel ? <h1 className='p-2 m-4 text-[#ffddf7] font-bold text-2xl text-left truncate'> 
                <FontAwesomeIcon icon={faClover} className='mr-2  text-xl ' />
                {activeChannel.name}
            </h1>
                : 
            <h1 className='p-2 text-[#ffddf7] font-bold text-2xl text-left truncate'> 
                <FontAwesomeIcon icon={faClover} className='mr-2 text-xl ' />
                Channel
            </h1>}
            <hr className='text-[#66435eb4]'/>
            {/* messages */}
            <div className=" max-h-10/12 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-[#66435e] scrollbar-track-[#2b1a27] flex-auto rounded-lg">
                <div>
                    {messages.map((message) => (
                        <div
                        key={message._id}
                        onClick={() => setActiveMessage(message)}
                        className={`flex flex-col gap-1 min-w-280  hover:bg-[#251721] rounded-lg px-3 py-2 transition b-0
                            ${activeMessage?._id == message._id ? "border border-[#683b5b] bg-[#251721]" : ""}`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-[#ffddf7]">
                                {message.senderName}
                                </span>
                                <div className="text-xs text-[#ad9ca9]">
                                {/* optional timestamp */}
                                {formatTime(message.createdAt)}
                                </div>
                            </div>
                            <div className="text-sm text-[#e6dce4] leading-relaxed wrap-break-word">
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>
                <div id='messages-end'></div>
            </div>
            
            <div className=" bottom-0 left-0 right-0 p-4 bg-[#2b1a27] ">
                <div className="flex items-center gap-3 bg-[#21141E] rounded-xl px-4 py-2 ">
                    <textarea
                    value = {message}
                    onChange={(e) => {setMessage(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;}
                    }
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend(e);
                        }}
                    }
                    placeholder={activeChannel ? `Message #${activeChannel.name}` : "Message #channel"}
                    className="flex-1 resize-none max-h-24 leading-5 overflow-y-auto bg-transparent text-[#ffddf7] placeholder-[#ad9ca9] outline-none text-base pt-2.5"/>
                    <button 
                        onClick={handleSend}
                        className={`px-4 py-1.5 rounded-lg bg-[#66435e] text-[#ffddf7] text-sm font-medium hover:bg-[#7a4f70 active:scale-98 transition ${loading ? "disabled: opacity-70" : ""}`}>Send</button>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default ChatInterface