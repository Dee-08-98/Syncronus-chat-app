// import React from 'react';
// import Routeing from './Pages/Routeing';

// function App(props) {
//   return (
//     <div>
//       <Routeing/>
//     </div>
//   );
// }

// export default App;


import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Error from './Pages/Error';
import Protect from './Protected/Protect';
import { Holder } from './ContextProvider/ContextApp';
import MyProfile from './Pages/MyProfile';
import Mychat from './Pages/Mychat';
import GroupChat from './Pages/GroupChat';
function App(props) {
  const { user, setUser } = useContext(Holder)

  // localStorage.removeItem('authToken')


  // console.log(user);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
      // console.log(user);
    } else {
      setUser(true);
      // console.log(user);
    }
  }, [setUser]);


  // const user = true


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

          <Route path='/groupChat' element={<Protect user={user} redirect='/login'>
            <GroupChat />
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

export default App