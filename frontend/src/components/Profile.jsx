/* eslint-disable no-unused-vars */
import { useState } from "react";
import Navbar from "./Navbar"
import { useAuth } from "./context/authProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import noImage from "../assets/noImage.jpg"
import OtpModal from "./OtpModal";
import ConfirmDelete from "./ConfirmDelete";


function Profile() {

  const [authUser, setAuthUser] = useAuth();
  console.log(authUser)



  


  return (
    <>
      <Navbar />

      {/* <div className="container-xl mt-5">
<span className="inline-block justyfy-space-between w-[80%]">
<h1 className=" font-bold text-2xl pb-5">
Profile Page
</h1>

<button className="btn btn-sm btn-warning btn-outline " onClick={logout}>Logout</button>
<a className="btn btn-sm btn-outline" onClick={logout}>Edit</a>
</span>

<div className="profile-section mt-5">
  <p>Name: <h3>{authUser?.fullName}</h3> </p>
</div>

    </div>
    <Toaster /> */}
      <ProfilePage />
    </>
  )
}

export default Profile



const ProfilePage = () => {

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const logout = () => {
    setAuthUser(null)
    localStorage.removeItem("User")
    toast("Logged Out !")

    setTimeout(() => {
      window.location.href = "/"
    }, 1000);
  }



  const [authUser, setAuthUser] = useAuth();
  const birthDate = formatDate(authUser?.dateOfBirth)
  console.log("Date of Birth : ", birthDate)



  const sendVerification = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json" 
     }
     
     let bodyContent = JSON.stringify({
       "email":authUser?.email
     });
     
     let reqOptions = {
       url: "http://localhost:4001/auth/verify-request-otp",
       method: "POST",
       headers: headersList,
       data: bodyContent,
     }
     
     let response = await axios.request(reqOptions);
     console.log(response.data);
     document.getElementById('otp_modal').showModal()

  }


  const deleteProfile = async () => {


    document.getElementById("confirm_delete_modal").showModal();
  }




  return (
    <div className="flex text-left justify-center mt-5">
      <div className=" p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile <span className="text-warning">Page</span></h1>
        <form className="space-y-4">
        {
          authUser.image ? <img src={authUser?.image} className="rounded-full h-[200px] w-[200px] sm:ml-[80px] ml-[20px]"></img> 
          : <img src={noImage} className="rounded-full h-[200px] w-[200px] sm:ml-[80px] ml-[20px]"></img>
        }

          <div>
            

            <label className="block text-gray-400">Name</label>
            <input
                disabled
              type="text"
              className="mt-1 p-2 w-full rounded hover:cursor-default bg-black"
              placeholder="Your Name"
              value={authUser?.fullName}  
            />
          </div>
          <div>
            <label className="block text-gray-400">Date of Birth</label>
            <span
              type="date"
              className="mt-1 p-2 w-full rounded block bg-black">
                {birthDate}
              </span>
          </div>
          <div>
            <label className="block text-gray-400">Email</label>
            <div className="flex items-center mt-1">
              <input
                  disabled
                type="email"
                className="p-2 w-full  rounded hover:cursor-default bg-black"
                placeholder="Your Email"
                value={authUser?.email}
              />
              {
                authUser?.verified ? <button
                  type="button"
                  className="btn btn-sm btn-success rounded-full ml-2 tooltip" data-tip="verified"
                >
                  <i className="bi bi-check"></i>
                </button> :
                  <button
                    type="button"
                    className="btn btn-sm btn-primary btn-outline ml-2"
                    onClick={sendVerification}
                  >
                    Verify
                  </button>
              }
            </div>
          </div>
          <div>
            <label className="block text-gray-400">Username</label>
            <input
            disabled
              type="text"
              className="mt-1 p-2 w-full rounded hover:cursor-default bg-black"
              placeholder="Username"
              value={authUser?.username}
            />
          </div>
          <div>
            <label className="block text-gray-400">Address</label>
            <input
            disabled
              type="text"
              className="mt-1 p-2 w-full rounded hover:cursor-default bg-black"
              placeholder="Username"
              value={authUser?.address}
            />
          </div>
          <div className="flex justify-between mt-6 gap-3 flex-col sm:flex-row">
            <a
              type="button"
              href="/edit-profile"
              className="btn btn-sm btn-success btn-outline"
            >
              Edit Profile
            </a>
            <button
              type="button"
              className="btn btn-sm btn-error btn-outline"
              onClick={deleteProfile}
            >
              Delete Account
            </button>
            <button
              type="button"
              className="btn btn-sm btn-warning btn-outline"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
      <OtpModal  email={authUser?.email} />
      <Toaster/>
      <ConfirmDelete email={authUser?.email} />
    </div>
  )
}
