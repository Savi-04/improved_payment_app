import { Link } from "react-router-dom";

export function BottomRedirection({ message, linkText, link }) {
    return <div className="text-center mt-6 text-gray-300 text-sm">
        {message}
        <Link to={link} className="font-semibold text-rose-300 hover:text-rose-100 hover:underline ml-1 transition-colors duration-200">
            {linkText}
        </Link>
    </div>
}
