export function FormFields({name, label, placeholder, onChange}){


    return <div className="mb-5 w-1/2">
        <h2 className="font-semibold">{label}</h2>
        <input name={name} type="text" onChange={onChange} placeholder={placeholder} className="border-2 border-gray-300 rounded-xl p-2 w-full mt-2" />

    </div>
}