/* eslint-disable no-unused-vars */
import { useAuth } from "./context/authProvider";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import axios from "axios";

export default function EditProfile() {
    const [authUser, setAuthUser] = useAuth();
    const dob = authUser?.dateOfBirth.slice(0, 10);

    const [formData, setFormData] = useState({
        fullName: authUser?.fullName,
        dateOfBirth: dob,
        username: authUser?.username,
        email: authUser?.email,
        address: authUser?.address,
        image: authUser?.image
    });

    useEffect(() => {
        setFormData({
            fullName: authUser?.fullName,
            dateOfBirth: authUser?.dateOfBirth.slice(0, 10),
            username: authUser?.username,
            email: authUser?.email,
            address: authUser?.address,
            image: authUser?.image
        });
    }, [authUser]);

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
        };

        let bodyContent = JSON.stringify({
            "email": formData.email,
            "fullName": formData.fullName,
            "dateOfBirth": formData.dateOfBirth,
            "username": formData.username,
            "image": formData?.image,
            "address": formData?.address,
        });

        let reqOptions = {
            url: "http://localhost:4001/user/update-user",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        };

        try {
            let response = await axios.request(reqOptions);
            console.log(response);
            toast.success("User updated successfully");

            setAuthUser({ ...authUser, ...response.data.user });

        } catch (error) {
            toast.error(error?.message || "An error occurred");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-5 text-left">
                <div className="p-8 rounded shadow-md w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-400">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className="mt-1 p-2 w-full rounded"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="mt-1 p-2 w-full rounded"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Email <small className="text-error">&nbsp;Cannot be updated</small></label>
                            <input
                                disabled
                                type="email"
                                name="email"
                                className="mt-1 p-2 w-full rounded"
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
                                className="mt-1 p-2 w-full rounded"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Profile Image URL</label>
                            <input
                                type="text"
                                name="image"
                                className="mt-1 p-2 w-full rounded"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="mt-1 p-2 w-full rounded"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-green-500 text-white rounded float-end"
                        >
                            Edit
                        </button>

                        <a
                            href="/profile"
                            className="py-2 px-4 bg-red-500 text-white rounded float-start"
                        >
                            Back
                        </a>
                    </form>
                </div>
            </div>

            <Toaster />
        </>
    );
}




















         // setTimeout(() => {
                //     window.location.href = '/profile'
    
                // }, 2000)