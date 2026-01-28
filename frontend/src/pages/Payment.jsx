import { Navigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

import axios from "axios";


export function Payment(){

    const location = useLocation();
    const {recipientId, currentUser} = location.state || {} ;
    
    const [willingToPay, setWillingToPay] = useState(0);
    const [canPay, setCanPay] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [effectiveBalance, setEffectiveBalance] = useState(currentUser.balance.balance); //since current user is static when comes through Navigate

    async function paymentHandler(){
        setDisableButton(true);
        
        try {
             await axios.post("http://localhost:3000/api/v1/transfer", {
            toAccountId: recipientId,
            amount: willingToPay,
            userId: currentUser.otherDetails._id
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }   
        })
        setDisableButton(false);
           alert("Payment Successful"); 
           setWillingToPay(0);
     
           const response = await axios.get("http://localhost:3000/api/v1/user/balance", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setEffectiveBalance(response.data.balance);
        
        }
        
        catch (error) {
            console.error("Error during payment:", error);
            alert("Payment Failed with error"); //we will see about that 
            Navigate("/dashboard");
            return;
        }

           
       
    }

    useEffect(() => {
        if (willingToPay > 0 && willingToPay <= effectiveBalance) {
            setCanPay(true);
        } else {
            setCanPay(false);
        }

       
    }, [willingToPay]);
    
return (
        <div className="w-1/2 m-auto pt-7">
            <div className="mb-4 flex-2">

            <h5 className="text-2xl font-bold mb-4 text-green-500">Make a Payment to {recipientId}</h5>
            <div className="mb-4 mr-1.5">Current User {currentUser.otherDetails._id}</div>
            {console.log(currentUser)} 
            <div className="mb-4">Current Balance: {effectiveBalance.toFixed(2)}</div>
            <div className="mb-4">Effective Balance after Payment: {(effectiveBalance - willingToPay).toFixed(2)}</div>
            </div>
            

            
            
            <input className="border border-gray-300 rounded-md p-2 w-full" type="number" value={willingToPay} onChange={(e) => setWillingToPay(prev => Number(e.target.value))} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" disabled={!canPay && disableButton} onClick={() => paymentHandler()}>Pay</button>
        </div>
    

)

}