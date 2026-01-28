import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Pagination } from "./pagination";


export function UserList({currentUser}){
   
    const Navigate = useNavigate();
   
    //has 2 state variables one for complete user list and other for paginated users

    const [userList, setUserList] = useState([]);
    const [paginatedUsers, setPaginatedUsers] = useState([]); //this will store users only paginated
    // const {filter, setFilter} = useState("");
    const usersPerPage = 5; //number of users to show per page in pagination

    useEffect( () => {axios.get("http://localhost:3000/api/v1/listUsers",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response)=>{
        setUserList(response.data.users);
        // console.log(response.data.users);

        setPaginatedUsers(userList.slice(0, usersPerPage)); //this is default list to display when no pagination is clicked, since 

//user list is rendered below by .map call on paginatedUsers, we cannot wait for user to click pagination first and then the paginationCallback to be called

//hence we set paginatedUsers here to first 5 users initially

    })}
 , [])



function onClickHandler(userId) {
    console.log("Clicked user with ID:", userId);
    Navigate("/payment", {state: {recipientId: userId, currentUser: currentUser}});
    return;
 }

function paginationCallback(pageNum){
    const startIndex = (pageNum - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    
    setPaginatedUsers(userList.slice(startIndex, endIndex));    //setting only paginated users

    return;

}






    return <div className="mt-6">
        <input type="text" placeholder="Search users..." className="border-2 rounded-xl p-2"   />
        <ul className="w-1/2 m-auto">
            
            
            {/* below code renders all users except current user */}

            { paginatedUsers.map((user) => {
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
        <Pagination totalUsers={userList.length} usersPerPage={5} paginationCallback={paginationCallback}/>
    </div>
}