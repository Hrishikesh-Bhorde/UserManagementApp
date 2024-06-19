/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const initialAuthUser = localStorage.getItem("User");

    const [authUser, setAuthUser] = useState(initialAuthUser ? JSON.parse(initialAuthUser) : undefined);

    useEffect(() => {
        if (authUser) {
            localStorage.setItem("User", JSON.stringify(authUser));
        } else {
            localStorage.removeItem("User");
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
