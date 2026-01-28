import { TopBar } from "../components/topBar";
import { Balance } from "../components/balance";
import { UserList } from "../components/userList";
import { use, useEffect, useState } from "react";
import axios from "axios";

export function Dashboard() {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user-info", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            // const {otherDetails} = response.data;
            setCurrentUser(response.data);
            console.log(currentUser.balance);
        })
    }, []);
    return <div>
hola
    <TopBar currentUser={currentUser.otherDetails} />
    

    <Balance value={currentUser.balance} />

    <UserList currentUser={currentUser} />

    </div>
}