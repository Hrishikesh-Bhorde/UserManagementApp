import  { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



// eslint-disable-next-line react/prop-types
const Login = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOTPReq, setIsOTPReq] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetOtp = async () => {
    try {
      const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      const bodyContent = JSON.stringify({ email });
      const reqOptions = {
        url: "http://localhost:4001/auth/login-request-otp",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      const res = await axios.request(reqOptions);
      console.log('Fetching OTP for email:', email);
      setIsOTPReq('OTP SENT');
      console.log(res)
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error('Error fetching OTP:', error);
      setErrorMessage(error.response?.data?.message || 'User Not Registered');
      setIsOTPReq(''); // Clear the OTP status

    }
  };

  const handleVerifyOtp = async () => {
    try {
      const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      const bodyContent = JSON.stringify({ email, otp });
      const reqOptions = {
        url: "http://localhost:4001/auth/login-verify-otp",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      const res = await axios.request(reqOptions);
      console.log('Verifying OTP:', otp);
      console.log(res);
      setErrorMessage(''); // Clear any previous error message
      toast.success('OTP Verified');
      localStorage.setItem("User", JSON.stringify(res.data.user))

      setTimeout(()=>{
              window.location.reload()
      window.location.href='/profile'
      }, 2000);
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('OTP Verification Failed')
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
      <div className="p-6 rounded-lg shadow-lg w-80 bg-[#395886] text-white relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 hover:text-black hover:bg-neutral-200 text-[#395886] bg-white border px-2 rounded-full"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-2 float-start" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 float-start" htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            minLength={6}
            maxLength={6}
            placeholder=""
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
          />
        </div>
        {isOTPReq && <p>OTP Sent</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex justify-between mb-3 mt-2">
          <button
          id='getOTPbtn'
            onClick={handleGetOtp}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Get OTP
          </button>
          <button
            onClick={handleVerifyOtp}
            className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Verify & Login
          </button>
        </div>
        <hr />
        <h3 className="mt-2">OR</h3>
        <a href="/signup" className="btn btn-warning btn-sm w-full mt-2">Signup</a>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
