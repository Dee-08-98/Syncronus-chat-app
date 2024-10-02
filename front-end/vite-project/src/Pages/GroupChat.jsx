import React from 'react';

import GroupChatSidebar from '../Components/GroupChatSidebar';
import GroupChatHeader from '../Components/GroupChatHeader';
import GroupChatContainer from '../Components/GroupChatContainer';
// import GroupChatSender from '../Components/GroupChatSender';

function GroupChat(props) {
    return (
        <>
            <div className="h-screen w-full font-serif text-white flex">
                <div className="w-[30%] bg-slate-800 h-full border-r-4 border-white">
                    <GroupChatSidebar />
                </div>
                <div className="w-[70%] bg-slate-600 h-full">
                    <div className="h-[10vh]">
                        <GroupChatHeader />
                    </div>
                    <div className="h-[90vh]">
                        <GroupChatContainer />
                    </div>
                   
                </div>
            </div>
        </>
    );
}

export default GroupChat;