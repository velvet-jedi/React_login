import { createContext, useState } from "react";
import React from "react";

const AuthContext = createContext({});

// children are teh components nested inside the AuthProvider
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);   // do we trust this device or not ? localstorage stores data in string format, so we need to parse it to get it in boolean format

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;