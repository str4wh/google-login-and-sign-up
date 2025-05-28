import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";

// This is like building a navigation bar - like the menu at the top of a restaurant! 🍽️

function Nav() {
    // This is like a light switch - it can be ON (true) or OFF (false)
    // It remembers if our mobile menu is open or closed
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        {/* This is our navigation bar - like a shelf that holds all our menu items */}
        <nav className="bg-blue-400 text-white">
            <div className="flex items-center justify-between">
                
                {/* This is our logo - like putting your name on your lunchbox */}
                <div className="text-4xl font-bold p-4">
                    <p>My Logo</p>
                </div>
                
                {/* DESKTOP MENU - This menu shows on big screens (like tablets and computers) */}
                {/* FIXED: Added proper CSS classes and made it hidden on mobile */}
                <div className="hidden md:block">
                    <ul className="flex space-x-8 mr-6">
                        <li><Link to="/" className="hover:text-blue-200 transition-colors">Home</Link></li>
                        <li><Link to="/Signup" className="hover:text-blue-200 transition-colors">Sign-Up</Link></li>
                        <li><Link to="/Login" className="hover:text-blue-200 transition-colors">Log-In</Link></li>
                    </ul>
                </div>

                {/* MOBILE HAMBURGER BUTTON - This is like a magic button that shows/hides menu on phones */}
                {/* FIXED: Removed extra space in "md: hidden" and added proper positioning */}
                <button 
                    className="md:hidden flex items-center justify-center p-4"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {/* This is like a shape-shifter! It changes from hamburger lines to an X */}
                    {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
                </button>
            </div>

            {/* MOBILE MENU - This menu drops down on small screens (like phones) */}
            {/* FIXED: Moved outside the flex container and added proper styling */}
            {isOpen && (
                <div className="md:hidden bg-blue-400 border-t border-blue-300">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li><Link to="/" className="block py-2 hover:text-blue-200 transition-colors" onClick={() => setIsOpen(false)} // Close menu when clicked
                        > Home</Link></li>

                        <li><Link to="/Signup" className="block py-2 hover:text-blue-200 transition-colors" onClick={() => setIsOpen(false)} // Close menu when clicked
                        >Sign-Up</Link></li>
                        
                        <li><Link to="/Login" className="block py-2 hover:text-blue-200 transition-colors" onClick={() => setIsOpen(false)} // Close menu when clicked
                        >Log-In</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    </div>
  )
}

export default Nav