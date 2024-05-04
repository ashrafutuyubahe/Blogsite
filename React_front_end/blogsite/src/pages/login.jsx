import React from "react";

export default function Login() {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
               
                <div className="flex justify-center space-x-4">
                   
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.77 3.23a3 3 0 00-4.24 0l-5 5a3 3 0 10-2.83 2.83l5-5a3 3 0 004.24 4.24l-1.83 1.83A7 7 0 1117 7.83l1.83-1.83a3 3 0 000-4.24zM12 14h.01" />
                        </svg>
                        Login with Facebook
                    </button>
                    
                    <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.32 10.51a4.54 4.54 0 010 3.98l-2.58 5.05c-.42.83-1.48.83-1.9 0l-2.58-5.05a4.54 4.54 0 010-3.98L7.97 8.51A4.54 4.54 0 0111.95 6h.09a4.54 4.54 0 013.98 2.51z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Login with Google
                    </button>
                   
                    <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10 0-5.52-4.48-10-10-10zM8 19c-.54 0-1.08-.11-1.58-.33-.47-.22-.9-.53-1.28-.9-.37-.37-.68-.8-.9-1.28-.22-.5-.33-1.04-.33-1.58s.11-1.08.33-1.58c.22-.47.53-.9.9-1.28.37-.37.8-.68 1.28-.9.5-.22 1.04-.33 1.58-.33s1.08.11 1.58.33c.47.22.9.53 1.28.9.37.37.68.8.9 1.28.22.5.33 1.04.33 1.58s-.11 1.08-.33 1.58c-.22.47-.53.9-.9 1.28-.37.37-.8.68-1.28.9-.5.22-1.04.33-1.58.33zM12 16c-2.67 0-5.33.53-8 1 0-1.8 2.2-3.43 5.65-4.38C7.41 12.81 9.7 12 12 12c2.3 0 4.59.81 6.35 2.27C18.8 13.57 21 15.2 21 17c-2.67-.47-5.33-1-8-1z" />
                        </svg>
                        Login with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
}
