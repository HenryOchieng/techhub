import { create } from "zustand"
import authService from "../services/authService"

const TOKEN_KEY = "techhub_token"

const getStoredToken = () => {
    return sessionStorage.getItem(TOKEN_KEY)
}

const useAuthStore = create((set, get) => ({
    user: null,
    token: getStoredToken(),
    isAuthenticated: Boolean(getStoredToken()),
    isLoading: false,
    isAuthReady: false,
    authCheckError: null,
    error: null,

    register: async (userData) => {
        set({ isLoading: true, error: null })

        try {
            const response = await authService.register(userData)

            set({ isLoading: false })

            return {
                success: true,
                data: response.user,
                message: response.message,
            }
        } catch (error) {
            const message =
                error.response?.data?.message ??
                "Registration failed. Please try again."

            set({
                isLoading: false,
                error: message,
            })

            return {
                success: false,
                error: message,
            }
        }
    },

    login: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
            const response = await authService.login(credentials)

            const { token, user } = response

            if (!token || !user) {
                throw new Error("Invalid authentication response.")
            }

            sessionStorage.setItem(TOKEN_KEY, token)

            set({
                token,
                user,
                isAuthenticated: true,
                isLoading: false,
                isAuthReady: true,
                authCheckError: null,
                error: null,
            })

            return {
                success: true,
                user,
            }
        } catch (error) {
            const message =
                error.response?.data?.message ??
                error.message ??
                "Login failed. Please check your credentials."

            set({
                isLoading: false,
                error: message,
            })

            return {
                success: false,
                error: message,
            }
        }
    },

    fetchCurrentUser: async () => {
        const token = get().token

        if (!token) {
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isAuthReady: true,
                isLoading: false,
                authCheckError: null,
            })

            return false
        }

        set({ isLoading: true, authCheckError: null })

        try {
            const response = await authService.getCurrentUser()

            if (!response.user) {
                throw new Error("Invalid user response")
            }

            set({
                user: response.user,
                token,
                isAuthenticated: true,
                isAuthReady: true,
                isLoading: false,
                authCheckError: null,
            })

            return true
        } catch (error) {
            const status = error.response?.status

            if (status === 401 || status === 404) {
                get().logout()
                return false
            }

            set({
                isLoading: false,
                isAuthReady: true,
                authCheckError: "Unable to verify your session. Please try again.",
            })

            return false

        }
    },

    logout: () => {
        sessionStorage.removeItem(TOKEN_KEY)

        set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            isAuthReady: true,
            authCheckError: null,
            error: null
        })
    },

    clearError: () => set({ error: null }),
}))

export default useAuthStore