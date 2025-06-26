import React , { useState } from 'react';
import { FaSeedling, FaMapMarkerAlt, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const AddLand = () => {

const [formData , setFormData] = useState({
    title:'',
    location:'',
    area:'',
    size:'',
    usage:'',
    price:'',
    leaseLength:'',
    paymentSchedule:'',
    improvements:'',
    holderName:'',
    contact:'',
    mapLink:'',
    image:'',
    });


    const handleChange =(e) => {
        const {name, value} =e.target;
        setFormData({...formData, [name]:value});
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    return(formData);
};



  return (
    <div className='max-w-5xl mx-auto mt-10 p-10 bg-gradient-to-br from-green-50 to-white dark:from-gray-700 rounded-2xl shadow-2xl'>
    
    <h2 className='text-4xl font-extrabold text-green-700 mb-6 flex items-center gap-2'>
        <FaSeedling className=' text-green-400'/> Add New Land Listing

    </h2>

    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-10'
    
    
    >
        <div className='space-y-4'>
            <div>
                <label className='block font-semibold mb-2'>Land Title</label>
                <input className='w-full px-4 py-2 border rounded-lg dark:bg-green-300' name='Title' onChange={handleChange} required></input>
            </div>

            <div>
                <label className='block font-semibold mb-2'>Location</label>
                <input className='w-full px-4 py-2 border rounded-lg dark:bg-green-300' name='Title' onChange={handleChange} required></input>
            </div>

            <div>
                <label className='block font-semibold mb-2'>Area</label>
                <input className='w-full px-4 py-2 border rounded-lg dark:bg-green-300' name='Title' onChange={handleChange} required></input>
            </div>

            <div>
                <label className='block font-semibold mb-2'>Land Size </label>
                <input className='w-full px-4 py-2 border rounded-lg dark:bg-green-300' name='Title' onChange={handleChange} required></input>
            </div>

            <div>
                <label className='block font-semibold mb-2'>Usage Type </label>
                <select className='w-full px-4 py-2 border rounded-lg dark:bg-green-300' onChange={handleChange} name="usage" id="">
<option value="">Select Usage</option>
<option value="Agriculture">Agriculture</option>
<option value="Commercial">Commercial</option>
<option value="Residential">Residential</option>
<option value="Parking">Parking</option>

                </select>
            </div>


        </div>

        <div className='space-y-4'>

            <div>
                <label className='block font-semibold mb-2'> Rentel Price</label>
                <input className='w-full px-4 py-2 boder rounded-lg dark:bg-green-400' name='price' onChange={handleChange} required />
            </div>

            <div>
                <label className='block font-semibold mb-2'> Lease Length</label>
                <input className='w-full px-4 py-2 boder rounded-lg dark:bg-green-400' name='price' onChange={handleChange} required />
            </div>

            <div>
                 <label className='block font-semibold mb-2'>Payment Schedule </label>
                <select className='w-full px-4 py-2 border rounded-lg dark:bg-green-300' onChange={handleChange} name="usage" id="">
                    <option value="">Payment Schedule </option>
                    <option value="monthly">Monthly</option>
                    <option value="3 monthly">3 Monthly</option>
                    <option value="6 monthly">6 Monthly</option>
                    <option value="Yearly">Yearly</option>

                </select> </div>

            <div>
                <label className='block font-semibold mb-2'> Landholder Full Name</label>
                <input className='w-full px-4 py-2 boder rounded-lg dark:bg-green-400' name='price' onChange={handleChange} required />
            </div>

            <div>
                <label className='block font-semibold mb-4'>  Contact</label>
                <input className='w-full px-4 py-2 boder rounded-lg dark:bg-green-400' name='contact' onChange={handleChange} required />
            </div>

            

        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Land Image URL</label>
            <input className="w-full px-4 py-2 border rounded-lg dark:bg-green-300" name="image" onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Google Maps Link</label>
            <input className="w-full px-4 py-2 border rounded-lg dark:bg-green-400" name="mapLink" onChange={handleChange} />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Development Plans or Improvements (optional)</label>
          <textarea className="w-full px-4 py-2 border rounded-lg dark:bg-green-300" name="improvements" rows="4" onChange={handleChange} />
        </div>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button type="submit" className="bg-red-400 hover:bg-green-700 text-white px-10 py-3 text-lg rounded-full shadow-xl">
            ➕ Add Land
          </button>
        </div>

    </form>
    
    </div>
  )
}

export default AddLand