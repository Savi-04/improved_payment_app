import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { recipient, currentUser } = location.state || {};

    if (!recipient || !currentUser) {
        return <Navigate to="/dashboard" />;
    }

    const [willingToPay, setWillingToPay] = useState("");
    const [canPay, setCanPay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [effectiveBalance, setEffectiveBalance] = useState(currentUser?.balance?.balance || 0);

    const quickAmounts = [10, 50, 100, 500];

    async function paymentHandler() {
        if (!canPay) return;
        setLoading(true);

        try {
            await axios.post("http://localhost:3000/api/v1/transfer", {
                toAccountId: recipient.userId,
                amount: Number(willingToPay),
                userId: currentUser.otherDetails._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            // Fetch updated balance
            const response = await axios.get("http://localhost:3000/api/v1/user/balance", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setEffectiveBalance(response.data.balance);
            setSuccess(true);
            toast.success("Transfer successful!");

            // Redirect after success animation
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            console.error("Error during payment:", error);
            toast.error("Payment Failed");
            setLoading(false);
        }
    }

    useEffect(() => {
        const amount = Number(willingToPay);
        if (amount > 0 && amount <= effectiveBalance) {
            setCanPay(true);
        } else {
            setCanPay(false);
        }
    }, [willingToPay, effectiveBalance]);

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 text-center animate-bounce-in">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                    <p className="text-gray-300">Redirecting to dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative z-10 flex flex-col items-center">

                {/* Recipient Info */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-rose-400 flex items-center justify-center text-4xl font-bold text-white shadow-xl mb-4 ring-4 ring-white/10">
                        {recipient.firstName[0].toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold text-white">Paying {recipient.firstName} {recipient.lastName}</h2>
                    <p className="text-emerald-400 font-medium mt-1">ID: {recipient.userId}</p>
                </div>

                {/* Amount Input */}
                <div className="w-full mb-8 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 text-gray-400 text-sm font-bold tracking-widest uppercase">Amount</div>
                    <div className="relative flex items-center justify-center">
                        <span className="text-4xl text-white font-bold mr-2">$</span>
                        <input
                            className="bg-transparent text-center text-6xl font-bold text-white w-full focus:outline-none placeholder-white/20"
                            type="number"
                            placeholder="0"
                            value={willingToPay}
                            onChange={(e) => setWillingToPay(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className={`text-center mt-2 text-sm font-medium transition-colors ${effectiveBalance - Number(willingToPay) < 0 ? 'text-rose-400' : 'text-gray-400'}`}>
                        Available Balance: ${Number(effectiveBalance).toFixed(2)}
                    </div>
                </div>

                {/* Quick Amounts */}
                <div className="flex gap-3 mb-8 w-full justify-center flex-wrap">
                    {quickAmounts.map(amount => (
                        <button
                            key={amount}
                            onClick={() => setWillingToPay(amount)}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all text-sm"
                        >
                            +${amount}
                        </button>
                    ))}
                </div>

                {/* Pay Button */}
                <button
                    className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2
                        ${!canPay || loading
                            ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:scale-[1.02] hover:shadow-emerald-500/25 active:scale-[0.98]'
                        }`}
                    disabled={!canPay || loading}
                    onClick={paymentHandler}
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>Pay Now</>
                    )}
                </button>

                <button onClick={() => navigate("/dashboard")} className="mt-6 text-gray-400 hover:text-white transition-colors text-sm">
                    Cancel Transfer
                </button>
            </div>
        </div>
    )
}