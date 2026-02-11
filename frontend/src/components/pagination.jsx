export function Pagination({ totalUsers, usersPerPage, paginationCallback }) {
    const paginationArr = [];
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    for (let i = 1; i <= totalPages; i++) {
        paginationArr.push(i);
    }
    return (
        <div className="flex justify-center mt-8 gap-2">
            {paginationArr.map((pageNum) => (
                <button
                    key={pageNum}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-white/5 border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 focus:ring-2 focus:ring-blue-400/50 shadow-lg"
                    onClick={() => paginationCallback(pageNum)}
                >
                    {pageNum}
                </button>
            ))}
        </div>
    );
}