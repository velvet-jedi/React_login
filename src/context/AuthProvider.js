import { createContext, useState } from "react";
import React from "react";

const AuthContext = createContext({});

// children are teh components nested inside the AuthProvider
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;