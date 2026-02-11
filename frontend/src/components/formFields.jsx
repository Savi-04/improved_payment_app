export function FormFields({ name, label, placeholder, onChange, type = "text" }) {
    return <div className="mb-5 w-full">
        <label className="block text-sm font-medium text-gray-100 mb-2 ml-1 tracking-wide">{label}</label>
        <input
            name={name}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400/50 transition-all duration-300 backdrop-blur-md shadow-inner"
        />
    </div>
}