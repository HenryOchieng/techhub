import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = useAuthStore((state) => state.login)
    const isLoading = useAuthStore((state) => state.isLoading)
    const error = useAuthStore((state) => state.error)
    const clearError = useAuthStore((state) => state.clearError)

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        clearError()

        const result = await login({ email, password })

        if (result.success) {
            const requestedPath = location.state?.from?.pathname
            const destination = result.user.role === "ADMIN"
                ? "/admin"
                : requestedPath?.startsWith("/admin")
                    ? "/account"
                    : requestedPath || "/account"

            navigate(destination, { replace: true})
        }
    }

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl fony-bold text-slate-900">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Sign int to your Techhub Kenya Account
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                clearError()
                            }}
                            placeholder="Enter your Email"
                            autoComplete="Email"
                            required
                            className="w-full px-4 py-3 border-gray-300 rounded-lg focus: outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                clearError()
                            }}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login