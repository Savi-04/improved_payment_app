import { TopBar } from "../components/topBar";
import { Balance } from "../components/balance";
import { UserList } from "../components/userList";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export function Dashboard() {

    const [currentUser, setCurrentUser] = useState({});

    //below code has become messy because I wanted to fetch using async await inside useEffect
    useEffect(() => {

        async function fetchUserData() {
            const response = await axios.get(`${API_URL}/api/v1/user-info`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response && response.data) {
                setCurrentUser(response.data);
            }
        }
        fetchUserData();
    }, []);
    return (
        <div className="min-h-screen pb-20">
            <TopBar currentUser={currentUser.otherDetails} />

            <div className="container mx-auto px-4 mt-8 max-w-6xl">
                <div className="mb-10">
                    <Balance value={currentUser.balance} />
                </div>

                <UserList currentUser={currentUser} />
            </div>
        </div>
    )
}