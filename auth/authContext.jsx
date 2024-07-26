// src/auth/authContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create a Context object
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        setUser({ username });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing context
export const useAuth = () => useContext(AuthContext);
