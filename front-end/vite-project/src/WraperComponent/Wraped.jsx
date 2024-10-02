import React from 'react';
import Sidebar from '../Pages/Sidebar';

import Header from '../Pages/Header';

const Wraped = () => (WrapedComponent) => {
    return (props) => {
        return (
            <>



                <div className='flex w-full h-screen '>

                    <div className="  hidden sm:block h-screen overflow-y-auto   w-full sm:w-[40%] md:w-[30%] lg:w-[20%]   md:border-r-4 md:border-white ">
                        <Sidebar />
                    </div>
                    <div className=" w-full sm:w-[60%] md:w-[70%] lg:w-[80%]  h-screen    bg-gray-800">
                        <div className="  px-2  ">
                            {/* <Header /> */}
                            <div className="">
                                <WrapedComponent {...props} />
                            </div>

                        </div>

                    </div>
                </div>

                

            </>
        )

    }
}

export default Wraped;