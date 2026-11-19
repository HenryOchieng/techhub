import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import useAuthStore from "../store/authStore"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validationError, setValidationError] = useState("")

    const register = useAuthStore((state) => state.register)
    const isLoading = useAuthStore((state) => state.isLoading)
    const error = useAuthStore((state) => state.error)
    const clearError = useAuthStore((state) => state.clearError)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setValidationError("")
        clearError()

        if (password !== confirmPassword) {
            setValidationError("Passwords do not match.")
            return
        }

        if (password.length < 8) {
            setValidationError("Password must contain at least 8 characters.")
        }

        const userData = {
            name: name.trim(),
            email: email.trim(),
            password,
            ...(phone.trim() && { phone: phone.trim() }),
        }

        const result = await register(userData)

        if (result.success) {
            toast.success(result.message || "Account created successfully!")
            navigate("/login", { replace: true })
        }
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value)
        setValidationError("")
        clearError()
    }

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Create Account
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Join Techhub Today
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleInputChange(setName)}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            required
                            maxLength={100}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number <span className="text-gray-400">(Optional)</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={handleInputChange(setPhone)}
                            placeholder="e.g. 07xxxxxxxx"
                            autoComplete="tel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleInputChange(setConfirmPassword)}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {(validationError || error) && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                            {validationError || error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div> 
        </div>
    )
}

export default Register