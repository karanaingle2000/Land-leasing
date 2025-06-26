import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Home = () => {
  return (
    

     
        <div className='min-h-screen bg-green-200 p-8'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold text-green-800 mb-5'>Welcome to Land lease Portal</h1>
                <p className='text-lg text-gray-800 max-w-2xl mx-auto'>
                A simple way to lease and list land for agricultural, residential, or commercial use.

                </p>
                <div className='flex flex-wrap gap-4 justify-center mt-6 '>
                    <Link to='/land-detail'>
                    <button className='bg-green-600 text-white px-6 py-6 rounded-md  shadow hover:bg-red-400 cursor-pointer '>
                        Browse Land
                    </button>
                    </Link>

                    <Link to='/addland'>
                    <button className='bg-white border border-green-300 text-black px-6 py-6 rounded-md shadow hover:bg-green-200 cursor-pointer'>
                        Add your land
                    </button>
                    </Link>
                </div>
            </div>

            <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                <div className='bg-white border-l-4 border-green-400 p-6 rounded-lg shadow'>
                    <h3 className='text-xl font-semibold text-green-400 mb-2'>📍 Location-Based Search</h3>
                    <p className='text-gray-500'>Choose between short-term or long-term lease durations based on your needs. </p>
               
                </div>

                <div className='bg-white border-l-4 border-green-400 p-6 rounded-lg shadow'>
                    <h3 className='text-xl font-semibold text-green-400 mb-2'>📆 Flexible Lease Terms</h3>
                    <p className='text-gray-500'>Choose between short-term or long-term lease durations based on your needs.</p>
                    
               
                </div>

                <div className='bg-white border-l-4 border-green-400 p-6 rounded-lg shadow'>
                    <h3 className='text-xl font-semibold text-green-400 mb-2'>💬 Direct Negotiation</h3>
                    <p className='text-gray-500'>Contact landowners directly to negotiate lease terms before finalizing agreements.</p>
               
                </div>

            </div>

            <div className='max-w-4xl mx-auto mt-16 bg-white rounded-lg shadow p-8 text-center'>
                <h2 className='text-2xl font-bold text-green-400 mb-4'>Start Leasing Land Today!</h2>
                    <p className='text-gray-700 mb-6'>
                    List your land and earn income, or find the perfect space for your agricultural or business ventures.
                    </p>
                    <Link to='/dashboard'>
                    <button className='bg-green-400 text-white px-6 py-3 rounded-md shadow hover:bg-red-500 cursor-pointer'>
                        Get Started Now

                    </button>
                    </Link>

            </div>
 
        </div>
     




     
  )
}

export default Home