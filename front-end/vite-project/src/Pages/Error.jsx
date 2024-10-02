import React from 'react';

function Error(props) {
    return (
        <div className='bg-yellow-100 h-[100vh] w-[100vw] flex justify-center items-center font-serif'>
           <div className="text-black">
           <h3 className='font-bold text-serif text-2xl'> Page not Found</h3>
           <h3 className='font-bold text-serif text-2xl mt-2'> Error : 404 </h3>
           </div>
        </div>
    );
}

export default Error;