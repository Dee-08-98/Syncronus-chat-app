// import React from 'react';
// import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// function Protect({ children, user, redirect = '/login' }) {
    
//     if (!user) return <Navigate to={redirect} />

//     return children ? children : <Outlet />
// }

// export default Protect;



import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Protect({ children, user, redirect = '/login' }) {
    return !user ? <Navigate to={redirect} /> : (children || <Outlet />);
}

export default Protect;
