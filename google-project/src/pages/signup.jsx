import React from 'react'
import Nav from '../components/nav'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';



function Signup() {

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("signup submitted");
        navigate("/pages/homepage2")
        
    };

  return (
    <div>
        <Nav/>
        <div className='bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 flex items-center justify-center px-4 py-8 min-h-[calc(100vh-80px)]'>
            <div className='w-full max-w-md bg-white rounded-4xl p-6 sm:p-8'>

                {/*Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold mb-4'>Create your account</h1>
                    <h3 className='text-[16px] sm:text-[18px] text-gray-600'>Hurry up and get started today</h3>
                </div>

                {/*form */}
                <form className="space-y-6 sm:space-y-8" onSubmit={handleSignup}>
                    <label htmlFor="fullname" className='text-[12px] sm:text-[14px] font-medium'>Full Name</label>
                    <input type="text" 
                    id='fullname'
                    name='fullname'
                    className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Enter Your full name'
                    required/>

                    <label htmlFor="email" className='text-[12px] sm:text-[14px] font-medium'>Email Address</label>
                    <input type="email" 
                    id='email'
                    name='email'
                    className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Enter Your Email Address'
                    required/>

                    <label htmlFor="email" className='text-[12px] sm:text-[14px] font-medium'>Password</label>
                    <input type="password" 
                    id='password'
                    name='password'
                    className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Enter Your Password'
                    required/>

                    <label htmlFor="confirmPassword" className='text-[12px] sm:text-[14px] font-medium'>Confirm Password</label>
                    <input type="password" 
                    id='confirmPassword'
                    name='confirmPassword'
                    className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Confirm Your Password'
                    required/>


                    {/* Sign Up Button */}
                    <button 
                    type='submit'
                    className='w-full bg-blue-600 text-white rounded-xl p-2 sm:p-3'>
                    Sign Up
                    </button>
                </form>

                {/*Divider*/}
                    <div className='my-6'>  
                        <div className='flex items-center'>
                            <div className='flex-1 border-t border-gray-400'></div>
                            <span className='px-4 text-gray-500 text-sm'>or</span>
                            <div className='flex-1 border-t border-gray-400'></div>
                        </div>
                    </div>

                {/*GOOGLE SIGN UP BUTTON*/}
                <div className="flex justify-center">
                        {/* Temporarily comment out GoogleLogin if it's causing issues */}
                        <div className="w-full">
                            <button className="w-full flex items-center justify-center">
                               <GoogleLogin   
                                onSuccess={(credentialResponse) => {
                                console.log(credentialResponse)
                                navigate ("/homepage2")
                                }} 
                                onError={() => console.log("Login Failed")}
                                theme="outline"
                                size="large"
                                width="200"/>
                    
                            </button>
                        </div>
                        
                        {/* Uncomment this when GoogleLogin is properly configured */}
                        {/*
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log('Google login success:', credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            theme="outline"
                            size="large"
                            width="300"
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        />
                        */}
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                                Log in
                            </Link>
                        </p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Signup