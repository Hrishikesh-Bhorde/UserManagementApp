/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate} from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import About from "./components/About";
import { useAuth } from "./components/context/authProvider";
import EditProfile from "./components/EditProfile";


function App() {
  
  const [authUser, setAuthUser] = useAuth();


  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={!authUser ? <Navigate to="/signup" /> :<Profile /> } />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
    </>
  )
}

export default App


{/* <Route path="/" element={<Home />}></Route>
    <Route path="/books" element={authUser ? <Courses /> : <Navigate to="/signup" />

*/}