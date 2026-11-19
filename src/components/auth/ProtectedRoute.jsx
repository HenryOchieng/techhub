import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuthStore from "../../store/authStore"

function ProtectedRoute({ allowedRoles }) {
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const isAuthReady = useAuthStore((state) => state.isAuthReady)
    const authCheckError = useAuthStore((state) => state.authCheckError)
    const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser)

    const location = useLocation()

    //wait until the initial authenctication check finishes
    if(!isAuthReady) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Checking your session...</p>
            </div>
        )
    }

    //Preserve the session if the server is temporarily unavailable
    if (authCheckError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
                <p className="text-red-600 text-center">
                    {authCheckError}
                </p>

                <button
                    onClick={fetchCurrentUser}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Retry
                </button>
            </div>
        )
    }

    //Redirect unauthenticated visitors to login
    if (!isAuthenticated || !user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace 
            />
        )
    }

    //Enforce role-based access.
    if (!allowedRoles && !allowedRoles.includes(user.role)) {
        const redirectPath =
            user.role === "ADMIN" ? "/admin" : "/account"

            return <Navigate to={redirectPath} replace />
    }

    return <Outlet />
}

export default ProtectedRoute