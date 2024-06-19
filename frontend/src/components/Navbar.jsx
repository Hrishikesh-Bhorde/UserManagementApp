import { useState } from "react";
import Login from "./Login";
import { useAuth } from "./context/authProvider";


function Navbar() {

  // eslint-disable-next-line no-unused-vars
  const [authUser, setAuthUser] = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const NavItems = (
    <>
      <li className="tooltip" data-tip='About'>
        <a href="/about"><i className="bi bi-info-circle-fill"></i></a>
      </li >
      <li className="tooltip tooltip-bottom" data-tip='Profile'>
        <a href="/profile"><i className="bi bi-person-circle"></i></a>
      </li>
    </>
  );

  return (
    // fixed top-0 left-0 right-0
    <div className="container md:px-20 px-4">
      <div className="navbar rounded shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black mt-3 z-[1] p-2 shadow rounded-box w-[80px] items-center"
            >
              {NavItems}
            </ul>
          </div>
          <a href="/" className="lg:text-xl font-bold cursor-pointer text-warning">
            H|B
          </a>
        </div>
        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-semibold text-xl">{NavItems}</ul>
          </div>
        
{ !authUser ? <div style={{zIndex:"999"}}>
        <button
      onClick={openModal}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-300 hover:text-black"
    >
      Login
    </button>
    {isModalOpen && <Login closeModal={closeModal} />}
          
        </div>
        : ""}
              {/* <span>
              <a
            className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
            onClick={() => document.getElementById("loginModal").showModal()}
          >
            Login
          </a>
          <Login />
            </span> */}
          <div></div>

        </div>
      </div>
    </div>
  );
}

export default Navbar;
