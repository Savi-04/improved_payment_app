import { Heading } from "../components/heading";
import { FormFields } from "../components/formFields";
import { BottomRedirection } from "../components/bottomRedirection";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export function Signup(){
   const Navigate = useNavigate();
   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
});
    
    
    function parentOnChange(e){
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    }


    async function SignupHandler(){
        
        try {
    const response = await axios.post("http://localhost:3000/api/v1/signup", formData);
    

    
    localStorage.setItem("token", response.data.token);     //auth token setup in local storage
    Navigate("/dashboard");

    
    // handle success
} catch (error) {
    // THIS is where the Zod error message lives
console.log("ERROR OCCURRED")
    
}
    }


    return <div className="container mx-auto w-1/2 border-2 border-gray-300 rounded-3xl p-5 mt-10">



        <Heading title="Signup Page" />
        <div className="flex-col items-center mt-10 flex">
        
        <FormFields name="firstName" label="firstname" placeholder="Enter your first name"  onChange={parentOnChange}/>
        
        <FormFields name="lastName" label="lastname" placeholder="Enter your last name"  onChange={parentOnChange}/>
         
        
        <FormFields name="email" label="email" placeholder="Enter your email" onChange={parentOnChange}/>
        <FormFields name="password" label="password" placeholder="Enter your password" onChange={parentOnChange}/>
        <button onClick={SignupHandler} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-5 w-1/2">Signup</button>
       
        <BottomRedirection message="Already have an account?" linkText="Login" link="/signin" />
        </div>


    </div>
    
    
}