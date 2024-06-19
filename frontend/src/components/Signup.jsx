/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import { useAuth } from './context/authProvider';



function Signup() {


  const [authUser, setAuthUser] = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    username: '',
    email: '',
    address: '',
    image: ''

});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": formData.email,
            "fullName": formData.fullName,
            "dateOfBirth": formData.dateOfBirth,
            "username": formData.username,
            "image": formData?.image,
            "address" : formData?.address,
        });

        let reqOptions = {
            url: "http://localhost:4001/user/create-user",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        try {
            let response = await axios.request(reqOptions);
            console.log(response.data);
            console.log(formData);
            toast.success(response.data)

            setTimeout(() => {
                window.location.href = '/'

            }, 2000)

        } catch (error) {
            toast.error(error?.message)
        }
    };

    return (
        <>
        <Navbar />
          <div className="flex justify-center mt-5 text-left">
      <div className="p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 p-2 w-full  rounded"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 w-full  rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Address</label>
            <input
              type="text"
              name="address"
              className="mt-1 p-2 w-full  rounded"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Image URL</label>
            <input
              type="text"
              name="image"
              className="mt-1 p-2 w-full  rounded"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-400">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="mt-1 p-2 w-full  rounded"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-400">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="mt-1 p-2 w-full  rounded"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>

<Toaster />
      </>
    );
}

export default Signup;







{/* <div className="fixed inset-0 flex items-center justify-center bg-opacity-75">
<div className="p-6 rounded-lg shadow-xl w-80 bg-[#395886] relative text-white  -[#5A749C]">
    <a href='/' className='text-xl font-semibold cursor-pointer text-warning mb-3'>H|B</a>
    <h1 className="text-center text-xl font-semibold mb-4">Create Account</h1>
    <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="fullname" className="sr-only">Full Name</label>
                <input id="fullname" name="fullname" type="text" value={formData.fullname} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2  -gray-300 placeholder-gray-500 text-black bg-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
            </div>
            <div>
                <label htmlFor="dateOfBirth" className="sr-only">Date of Birth</label>
                <input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required className=" rounded-none relative block w-full px-3 py-2  -gray-300 placeholder-gray-500 text-black bg-white focus:outline-none focus:ring-indigo-500 focus:-indigo-500 focus:z-10 sm:text-sm" placeholder="Date of Birth" />
            </div>
            <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2  -gray-300 placeholder-gray-500 text-black bg-white focus:outline-none focus:ring-indigo-500 focus:-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
            </div>
            <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2  -gray-300 placeholder-gray-500 text-black bg-white focus:outline-none focus:ring-indigo-500 focus:-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
            <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2  -gray-300 placeholder-gray-500 text-black bg-white focus:outline-none focus:ring-indigo-500 focus:-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
            </div>
        </div>
        <div>
            <button type="submit" className="group relative w-full mb-2 flex justify-center py-2 px-4  -transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create Account
            </button>
            <a href='/' className="group relative w-full flex justify-center py-2 px-4  -transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Back
            </a>
        </div>
    </form>
</div>
<Toaster />
</div> */}