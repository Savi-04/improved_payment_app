export function Pagination( {totalUsers , usersPerPage, paginationCallback} ) {

    console.log("Total Users:", totalUsers);
    const paginationArr = [];

    const totalPages = Math.ceil(totalUsers / usersPerPage);
    for(let i=1; i<= totalPages; i++){
        paginationArr.push(i);

    }
    return <div className="flex justify-center mt-6">
        {paginationArr.map((pageNum) => (
            <button key={pageNum} className="mx-1 px-3 py-1 border rounded"
            onClick={() => paginationCallback(pageNum)}
            >
                {pageNum}
            </button>
        ))}
    </div>;
}