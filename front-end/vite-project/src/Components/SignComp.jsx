

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import signUpValidation from '../Schema/signupValidation';
import axios from 'axios';
import { Holder } from '../ContextProvider/ContextApp';

function SignComp() {
    const { setUser , setLoginData} = useContext(Holder);

    const initialValues = { name: "", email: "", password: "" };

    const { errors, handleChange, handleBlur, handleSubmit, touched, values } = useFormik({
        initialValues,
        validationSchema: signUpValidation,
        onSubmit: async (values, actions) => {
            try {
                const res = await axios.post('http://localhost:4556/api/user/register', values);
                toast.success(res.data.message);
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('myid', res.data.result.id);
                setLoginData(res.data.result)
                setUser(true)
                actions.resetForm();
            } catch (err) {
                toast.error("User registration failed");
                console.error("User Registration error", err);
            }
        }
    });

    return (
        <div className="min-h-screen font-serif w-full flex justify-center items-center bg-white text-black">
            <div className="h-auto w-full md:w-[70%] lg:w-[50%] bg-white md:shadow-2xl px-2 sm:px-10 md:px-5 rounded-2xl py-10">
                <h3 className='font-bold text-3xl mb-3'>SignUp</h3>
                <p className='text-extrabold text-lg'>Fill all details to get started with the best chat app!</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='bg-inherit font-bold text-xl w-full p-2 border-b-2 border-black outline-none rounded-xl mt-4'
                    />
                    {errors.name && touched.name && <p className='mt-1 font-bold text-red-500'>{errors.name}</p>}
                    
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='bg-inherit font-bold text-xl w-full p-2 border-b-2 border-black outline-none rounded-xl mt-4'
                    />
                    {errors.email && touched.email && <p className='mt-1 font-bold text-red-500'>{errors.email}</p>}
                    
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='bg-inherit font-bold text-xl w-full p-2 border-b-2 border-black outline-none rounded-xl mt-4'
                    />
                    {errors.password && touched.password && <p className='mt-1 font-bold text-red-500'>{errors.password}</p>}
                    
                    <button type='submit' className='w-full bg-green-500 hover:bg-green-600 py-[6px] rounded-2xl mt-8 font-bold text-xl'>SignUp</button>
                </form>
                <p className='font-bold text-[16px] mt-4 px-2'>Already have an account? <Link to='/login'><span className='underline text-blue-600'>Login Here</span></Link></p>
            </div>
        </div>
    );
}

export default SignComp;
