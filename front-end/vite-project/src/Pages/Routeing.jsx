import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './Chat';
import Profile from './Profile';
import Login from './Login';
import Signup from './Signup';
import Error from './Error';
import MyProfile from './MyProfile';
import { Holder } from '../ContextProvider/ContextApp';
import Mychat from './Mychat';
import Protect from '../Protected/Protect';
function Routeing(props) {
//   const { user, setUser,setSelectedToken , selectToken } = useContext(Holder)

//   localStorage.removeItem('authToken')


//   console.log(user);
//   console.log(selectToken);



 
 
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setUser(true);
//       console.log('user true :-' , token , user);
//     } else {
//       setUser(false);
//       console.log('user false :-' , token , user);

//     }
//   }, [setUser]);


  const user = true


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<Protect user={user} />} >
            <Route path='/' element={<Chat />} />
            {/* <Route path='/mychat' element={<Mychat />} /> */}

          </Route>

          <Route path='/mychat' element={<Protect user={user} redirect='/login'>
            <Mychat />
          </Protect>} />

          <Route path='/profile' element={<Protect user={user} redirect='/login'>
            <Profile />
          </Protect>} />

          <Route path='/myprofile' element={<Protect user={user} redirect='/login'>
            <MyProfile />
          </Protect>} />

          <Route path='/login' element={<Protect user={!user} redirect='/myprofile'>
            <Login />
          </Protect>} />
          <Route path='/signup' element={<Protect user={!user} redirect='/profile'>
            <Signup />
          </Protect>} />

          <Route path='*' element={<Error />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default Routeing;

