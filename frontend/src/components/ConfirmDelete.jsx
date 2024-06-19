/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useAuth } from "./context/authProvider";
import axios from "axios";
import { toast } from 'react-hot-toast';

export default function ConfirmDelete({email}) {

const [authUser, setAuthUser] = useAuth();


const deleteAccount = async ()=>{

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json" 
       }
       
       let bodyContent = JSON.stringify({
         "email" : authUser?.email
       });
       
       let reqOptions = {
         url: "http://localhost:4001/user/delete-user",
         method: "POST",
         headers: headersList,
         data: bodyContent,
       }
       
       let response = await axios.request(reqOptions);
       console.log(response.data);
  
       setAuthUser(null)
       localStorage.removeItem("User")
       toast("User Deleted !")
   
       setTimeout(() => {
         window.location.href = "/"
       }, 2000);
}



  return (
    <div>
        <dialog id="confirm_delete_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Confirm Delete!</h3>
    <p className="py-4">Are you sure you want to delete your account ?</p>
    <div className="modal-action">
    <button className="btn" onClick={deleteAccount}>Delete</button>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}
