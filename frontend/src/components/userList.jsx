import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


export function UserList({currentUser}){
   
    const Navigate = useNavigate();
   
    const [userList, setUserList] = useState([]);
    // const {filter, setFilter} = useState("");

    useEffect( () => {axios.get("http://localhost:3000/api/v1/listUsers",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response)=>{
        setUserList(response.data.users);
        // console.log(response.data.users);
    })}
 , [])



function onClickHandler(userId) {
    console.log("Clicked user with ID:", userId);
    Navigate("/payment", {state: {recipientId: userId, currentUser: currentUser}});
    return;
 }

    return <div className="mt-6">
        <input type="text" placeholder="Search users..." className="border-2 rounded-xl p-2"   />
        <ul className="w-1/2 m-auto">
            { userList.map((user) => {
                if(user.userId === currentUser.otherDetails._id) {
                    return null;
                }

                return (


                     <li key={user.userId} className="border-b-2 p-4 flex justify-between">

                    {user.firstName} {user.lastName} {user.userId}
                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                     
                    onClick={() => onClickHandler(user.userId)}
                     
                     >Pay Now</button>
                </li>
                )             
                

                
            }
            
            
            )}
            
        </ul>
    </div>
}