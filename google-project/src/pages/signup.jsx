import React, { useState } from 'react'
import Nav from '../components/nav'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
// Import Firebase authentication functions
import { auth, db } from '../firebase-config'; // Adjust path based on your file structure
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Signup() {
    const navigate = useNavigate();
    
    // State for form data and loading/error states
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle email/password signup with Firebase
    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );
            
            const user = userCredential.user;

            // Update the user's display name
            await updateProfile(user, {
                displayName: formData.fullname
            });

            // Optional: Store additional user data in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                fullName: formData.fullname,
                email: formData.email,
                createdAt: new Date().toISOString(),
                // Add any other user data you want to store
            });

            console.log('User created successfully:', user);
            
            // Navigate to homepage after successful signup
            navigate("/pages/homepage2");
            
        } catch (error) {
            console.error('Signup error:', error);
            
            // Handle specific Firebase auth errors
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Email is already registered');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak');
                    break;
                default:
                    setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle Google signup
    const handleGoogleSignup = async () => {
        setError('');
        setLoading(true);
        
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Optional: Store user data in Firestore if it's a new user
            await setDoc(doc(db, 'users', user.uid), {
                fullName: user.displayName,
                email: user.email,
                createdAt: new Date().toISOString(),
                signupMethod: 'google'
            }, { merge: true }); // merge: true prevents overwriting existing data

            console.log('Google signup successful:', user);
            navigate("/pages/homepage2");
            
        } catch (error) {
            console.error('Google signup error:', error);
            setError('Failed to sign up with Google. Please try again.');
        } finally {
            setLoading(false);
        }
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

                    {/* Error Message */}
                    {error && (
                        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                            {error}
                        </div>
                    )}

                    {/*form */}
                    <form className="space-y-6 sm:space-y-8" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="fullname" className='text-[12px] sm:text-[14px] font-medium'>Full Name</label>
                            <input 
                                type="text" 
                                id='fullname'
                                name='fullname'
                                value={formData.fullname}
                                onChange={handleInputChange}
                                className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                placeholder='Enter Your full name'
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className='text-[12px] sm:text-[14px] font-medium'>Email Address</label>
                            <input 
                                type="email" 
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                placeholder='Enter Your Email Address'
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className='text-[12px] sm:text-[14px] font-medium'>Password</label>
                            <input 
                                type="password" 
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                placeholder='Enter Your Password'
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className='text-[12px] sm:text-[14px] font-medium'>Confirm Password</label>
                            <input 
                                type="password" 
                                id='confirmPassword'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className='w-full border p-2 sm:p-3 rounded-xl mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                placeholder='Confirm Your Password'
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button 
                            type='submit'
                            disabled={loading}
                            className={`w-full text-white rounded-xl p-2 sm:p-3 ${
                                loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
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
                            <button 
                                onClick={handleGoogleSignup}
                                disabled={loading}
                                className="w-full flex items-center justify-center"
                            >
                                <GoogleLogin   
                                    onSuccess={handleGoogleSignup}
                                    onError={() => setError("Google signup failed")}
                                    theme="outline"
                                    size="large"
                                    width="200"
                                />
                            </button>
                        </div>
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