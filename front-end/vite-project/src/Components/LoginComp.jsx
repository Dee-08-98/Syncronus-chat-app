import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import loginValidation from '../Schema/loginValidation';
import axios from 'axios'
import { Holder } from '../ContextProvider/ContextApp';

function LoginComp(props) {

    const {setLoginData , setUser , setSelectedToken} = useContext(Holder)
    const initialValues = {
        email: "",
        password: ""
    };

    const { errors, handleChange, handleBlur, handleSubmit, touched, values } = useFormik({
        initialValues,
        validationSchema: loginValidation,
        onSubmit: async (values, actions) => {
            try {
                const res = await axios.post('http://localhost:4556/api/user/login', values);
                toast.success(res.data.message);
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('myid', res.data.result.id);
                setLoginData(res.data.result)
                // console.log(res.data);
                setUser(true)
                setSelectedToken(res.data.token)
                actions.resetForm();
            } catch (err) {
                console.error("User lOGIN error", err);
            }
        }
    });


    return (
        <>
            <div className="min-h-screen font-serif max-h-auto w-full flex justify-center items-center bg-white text-black">

                <div className="h-auto w-full md:w-[70%] lg:w-[50%] bg-white md:shadow-2xl px-2 sm:px-10 md:px-5 rounded-2xl py-10">
                    <div className="px-3">
                        <h3 className='font-bold text-3xl mb-3'>Login</h3>
                        <p className='text-extrabold text-lg '> Fill all details to get start with best chat app!</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder=' Email'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='bg-inherit font-bold text-xl w-full p-2 border-b-2 border-black outline-none rounded-xl mt-4' />

                        {
                            errors.email && touched.email ? <p className='lg:indent-2 md:indent-2 sm:indent-1 mt-1 font-bold text-red-500 font-serif'>{errors.email}</p> : null
                        }

                        <input
                            type="password"
                            placeholder=' Password'
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='bg-inherit font-bold text-xl w-full p-2 border-b-2 border-black outline-none rounded-xl mt-4' />


                        {
                            errors.password && touched.password ? <p className='lg:indent-2 md:indent-2 sm:indent-1 mt-1 font-bold text-red-500 font-serif'>{errors.password}</p> : null
                        }

                        <button type='submit' className='w-full bg-green-500 hover:bg-green-600 py-[6px] rounded-2xl mt-8 font-extrabold text-xl'> Login </button>
                    </form>

                    <p className='font-bold text-[16px] mt-4 px-2'> Not have an account , <Link to={'/signup'}><span className='underline text-blue-600'> Signup Here</span></Link></p>

                </div>

            </div>
        </>
    );
}

export default LoginComp;