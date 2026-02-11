import { useNavigate } from "react-router-dom";

export function TopBar({ currentUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return (
        <div className="flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4 sticky top-0 z-50 shadow-lg">
            <div className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-blue-400">
                PAYTM
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Welcome</div>
                    <div className="text-base font-semibold text-white">
                        {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Guest"}
                    </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/10">
                    {currentUser ? currentUser.firstName[0].toUpperCase() : "U"}
                </div>
                <button
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-all border border-white/10"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}