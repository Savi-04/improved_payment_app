export function Balance({ value }){

    const actual_balance = value ? value.balance.toFixed(2) : " ";
    const user_id = value ? value._id : " ";
    return <div className="border-2 mt-8 overflow-visible rounded-2xl flex p-5 text-xl w-1/5 font-bold">Your Balance is : {actual_balance} {user_id}</div>
}