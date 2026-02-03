import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChevronRight, faChevronLeft, faCircle } from '@fortawesome/free-solid-svg-icons';


function UsersList() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`mr-2 relative h-full min-w-0 flex-none bg-[#2b1a27] border-l border-[#66435eb4] transition-all duration-300 ease-in-out ${isOpen ? 'w-60' : 'w-14'}`}>
        <div className='h-12 flex items-center justify-center border-b border-[#66435eb4] shadow-sm cursor-pointer hover:bg-[#352230] transition-colors'
             onClick={() => setIsOpen(!isOpen)}
             title={isOpen ? "Collapse Member List" : "Expand Member List"}>
            {isOpen ? (
                <div className='flex items-center gap-2 text-[#ffddf7] font-bold'>
                     <span className='truncate'>Members</span>
                </div>
            ) : (
                <FontAwesomeIcon icon={faUsers} className='text-[#ffddf7]' />
            )}
        </div>

        <div className='flex flex-col p-3 gap-2 overflow-y-auto h-[calc(100%-3rem)]'>
            {isOpen ? (
                <>
                    <div className='text-xs font-bold text-[#ad9ca9] uppercase mb-1 mt-2'>Online — {MOCK_USERS.length}</div>
                    {MOCK_USERS.map((user) => (
                        <div key={user.id} className='flex items-center gap-3 p-2 rounded-md hover:bg-[#352230] cursor-pointer group'>
                            <div className='relative'>
                                <div className='w-8 h-8 rounded-full bg-[#66435e] flex items-center justify-center text-[#ffddf7] font-semibold'>
                                    {user.name[0]}
                                </div>
                                <span className='absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2b1a27]' style={{backgroundColor: user.color}}></span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-[#e6dce4] font-medium text-sm group-hover:text-[#ffddf7]'>{user.name}</span>
                                <span className='text-[10px] text-[#ad9ca9] leading-none'>Playing VS Code</span>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className='flex flex-col items-center gap-4 mt-2'>
                    {MOCK_USERS.map((user) => (
                        <div key={user.id} className='relative group'>
                            <div className='w-8 h-8 rounded-full bg-[#66435e] flex items-center justify-center text-[#ffddf7] font-semibold cursor-pointer hover:bg-[#7a4f70]'>
                                {user.name[0]}
                            </div>
                             <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#2b1a27]' style={{backgroundColor: user.color}}></span>
                             
                             {/* Tooltip on hover when collapsed */}
                             <div className='absolute right-10 top-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-opacity'>
                                {user.name}
                             </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
  kk
}

export default UsersList