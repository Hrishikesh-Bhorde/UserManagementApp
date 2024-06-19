/* eslint-disable no-unused-vars */

import { useAuth } from "./context/authProvider"
import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";

// eslint-disable-next-line react/prop-types
function OtpModal({email}) {

    const [authUser, setAuthUser] = useAuth();
    const [otp, setOtp] = useState("");

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            toast.error("OTP must be 6 digits long");
            return;
        }

        try {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json" 
               }
               
               let bodyContent = JSON.stringify({
                 "email":email,
                 "otp":otp
               });
               
               let reqOptions = {
                 url: "http://localhost:4001/auth/verify-email-otp",
                 method: "POST",
                 headers: headersList,
                 data: bodyContent,
               }
               
               let response = await axios.request(reqOptions);
               console.log(response.data);
               toast.success("OTP Verified")
               setAuthUser({...authUser, ...response.data.user})

               document.getElementById("otp_modal").close();


               
        } catch (error) {
            console.error(error);
            toast.error(error)
        }
        
           
    }

    console.log(email)
  return (
    <>
    <dialog id="otp_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">OTP Sent to : <small>{email}</small></h3>

    <input type="tel" minLength={6} maxLength={6} name="otp" onChange={handleOtpChange} className="input input-bordered input-accent w-full mt-3" />
    <div className="modal-action">
    <button className="btn float-left" onClick={handleVerifyOtp}>Verify OTP</button>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
    </>
  )
}

export default OtpModal