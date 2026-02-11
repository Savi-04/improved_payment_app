import { Heading } from "../components/heading";
import { FormFields } from "../components/formFields";
import { BottomRedirection } from "../components/bottomRedirection";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export function Signin() {
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function SigninHandler() {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signin", formData);
            localStorage.setItem("token", response.data.token);
            toast.success("Signed in successfully!");
            Navigate("/dashboard");
        } catch (error) {
            console.log("ERROR OCCURRED", error);
            toast.error(error.response?.data?.message || "Invalid credentials");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-rose-400"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <Heading title="Welcome Back" />

                <div className="flex flex-col mt-4">
                    <FormFields name="email" label="Email Address" placeholder="john@example.com" onChange={handleChange} type="email" />
                    <FormFields name="password" label="Password" placeholder="••••••••" onChange={handleChange} type="password" />

                    <button
                        onClick={SigninHandler}
                        className="mt-6 w-full py-3.5 bg-gradient-to-r from-blue-600 to-rose-500 hover:from-blue-700 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                    >
                        Sign In
                    </button>

                    <BottomRedirection message="Don't have an account?" linkText="Sign Up" link="/signup" />
                </div>
            </div>
        </div>
    );
}