import React from 'react'
import Nav from '../components/nav'
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';


function Login() {

  const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("signup submitted");
        navigate("/homepage2") // Fixed: removed /pages/ from path
    } // Fixed: added missing closing brace

  return (
    <div>
        <Nav />
      
        <div className='bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 flex items-center justify-center px-4 py-8 min-h-[calc(100vh-80px)]'>
            <div className='w-full max-w-md bg-white rounded-4xl p-6 sm:p-8'>

                {/*Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold mb-4'>Create your account</h1>
                    <h3 className='text-[16px] sm:text-[18px] text-gray-600'>Hurry up and get started today</h3>
                </div>

                {/*form */}
                <form className="space-y-6 sm:space-y-8" onSubmit={handleSignup}>

                    {/*FullName */}
                    <label htmlFor="fullname" className='text-[12px] sm:text-[14px] font-medium'>Full Name</label>
                    <input type="text" 
                    id='fullname'
                    name='fullname'
                    className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Enter Your full name'
                    required/>

                    {/*password */}
                    <label htmlFor="password" className='text-[12px] sm:text-[14px] font-medium'>Password</label>
                    <input type="password" 
                    id='password'
                    name='password'
                    className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Enter Your Password'
                    required/>

                    {/*confirm */}
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
                    <div className="w-full">
                        <button className="w-full flex items-center justify-center">
                           <GoogleLogin   
                            onSuccess={(credentialResponse) => {
                            console.log(credentialResponse)
                            navigate("/homepage2") // Fixed: correct path to your homepage
                            }} 
                            onError={() => console.log("Login Failed")}
                            theme="outline"
                            size="large"
                            width="200"/>
                
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Login