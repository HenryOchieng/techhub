function InputField({
    label,
    name,
    type = "text",
    register,
    error,
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
                placeholder={placeholder}
                {...register(name)}
                className={`w-full rounded-xl px-4 py-3 border transition ${
                    error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                }
                focus:outline-none focus:ring-2`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default InputField