
import React, { useState } from 'react';
import { createContext } from 'react';



export const Holder = createContext("")


function ContextApp({ children }) {
    
const [loginData, setLoginData] = useState(null)
const [selectedChat, setSelectedChat] = useState(null)
const [selectToken, setSelectedToken] = useState(null)



// const [user, setUser] = useState(!!localStorage.getItem('token'));
const [user, setUser] = useState(false);
const [group, setGroup] = useState([]);
const [ourGroup, setOurGroup] = useState(null);


// console.log(user);

    return (
        <>

            <Holder.Provider value={{loginData, setLoginData , user  , setUser , selectedChat, setSelectedChat , selectToken, setSelectedToken , group, setGroup ,ourGroup, setOurGroup}}>
                {children}
            </Holder.Provider>


        </>
    );
}

export default ContextApp;