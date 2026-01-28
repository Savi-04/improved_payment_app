


export function TopBar({currentUser}){
    return <div className="border-2 mt-8 rounded-2xl flex p-5 text-xl font-bold">
        <div className="w-1/5 ml-40">Hello {`${currentUser ? currentUser.firstName : "User"} ${currentUser ? currentUser.lastName : "User"}`}</div>

    </div>
}