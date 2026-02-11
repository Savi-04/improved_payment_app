export function Balance({ value }) {
    const actual_balance = value ? Number(value.balance).toFixed(2) : "0.00";

    return (
        <div className="w-full bg-gradient-to-r from-blue-900/40 to-rose-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-rose-500/20"></div>

            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-widest z-10">Total Balance</h2>
            <div className="text-5xl font-bold text-white tracking-tighter z-10 flex items-baseline gap-2">
                <span className="text-2xl text-rose-400">$</span>
                {actual_balance}
            </div>
        </div>
    )
}