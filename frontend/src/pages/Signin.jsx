import { Heading } from "../components/heading";
import { FormFields } from "../components/formFields";
import { BottomRedirection } from "../components/bottomRedirection";
export function Signin() {
    return <div className="container mx-auto w-1/2 border-2 border-gray-300 rounded-3xl p-5 mt-10">

        <Heading title="Signin Page" />
        <div className="flex-col items-center mt-10 flex">

        <FormFields label="Email" placeholder="Enter your email" />
        <FormFields label="Password" placeholder="Enter your password" />

        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-5 w-1/2">Sign in</button>

        <BottomRedirection message="Don't have an account?" linkText="Signup" link="/signup" />
        </div>



    </div>
}