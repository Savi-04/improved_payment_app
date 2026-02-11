import { Heading } from "../components/heading";
import { FormFields } from "../components/formFields";
import { BottomRedirection } from "../components/bottomRedirection";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { API_URL } from "../config";

export function Signup() {
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    function parentOnChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }



    async function SignupHandler() {
        try {
            const response = await axios.post(`${API_URL}/api/v1/signup`, formData);
            localStorage.setItem("token", response.data.token);
            toast.success("Account created successfully!");
            Navigate("/dashboard");
        } catch (error) {
            console.log("ERROR OCCURRED", error);
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-blue-500"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <Heading title="Create Account" />

                <div className="flex flex-col mt-4">
                    <FormFields name="firstName" label="First Name" placeholder="John" onChange={parentOnChange} />
                    <FormFields name="lastName" label="Last Name" placeholder="Doe" onChange={parentOnChange} />
                    <FormFields name="email" label="Email Address" placeholder="john@example.com" onChange={parentOnChange} type="email" />
                    <FormFields name="password" label="Password" placeholder="••••••••" onChange={parentOnChange} type="password" />

                    <button
                        onClick={SignupHandler}
                        className="mt-6 w-full py-3.5 bg-gradient-to-r from-rose-500 to-blue-600 hover:from-rose-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                    >
                        Sign Up
                    </button>

                    <BottomRedirection message="Already have an account?" linkText="Sign In" link="/signin" />
                </div>
            </div>
        </div>
    );
}