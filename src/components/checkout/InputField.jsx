function InputField({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange
}) {
    return (
        <div>
            <label className="block mb-2 font-medium">
                {label}
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-blue-600"
            />
        </div>
    )
}

export default InputField