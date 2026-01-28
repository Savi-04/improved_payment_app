import { Link } from "react-router-dom";
export function BottomRedirection({message, linkText, link}){

    return <div className="text-center mt-5 border-2 border-gray-300 rounded-3xl p-5">
        <span>{message} </span>
        <Link to={link}>{linkText}</Link>
        </div>
}
