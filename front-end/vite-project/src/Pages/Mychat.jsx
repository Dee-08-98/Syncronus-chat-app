import React from 'react';
import MessageHeader from '../Components/MessageHeader';
import MessageContaoner from '../Components/MessageContaoner';
import MychatSidebar from '../Components/MychatSidebar';

function Mychat(props) {
    return (
        <>
            {/* <div className="h-screen w-full font-serif text-white flex">
                <div className="w-[30%] bg-slate-800 h-full border-r-4 border-white">
                    <MychatSidebar />
                </div>
                <div className="w-[70%] bg-slate-600 h-full">
                    <div className="h-[10vh]">
                        <MessageHeader />
                    </div>
                    <div className="h-[90vh]">
                        <MessageContaoner />
                    </div>

                </div>
            </div> */}


            <div className="h-screen w-full font-serif text-white flex">
                <div className="w-[30%] bg-slate-800 h-full border-r-4 border-white">
                    <MychatSidebar />
                </div>
                <div className="w-[70%] bg-slate-600 h-full">
                    <div className="h-[10vh]">
                        <MessageHeader />
                    </div>
                    <div className="h-[90vh]">
                        <MessageContaoner />
                    </div>

                </div>
            </div>


        </>
    );
}

export default Mychat;