import { createContext, useState, useContext } from 'react';
import usersData from '../data/user.json'; // Importing JSON data directly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password, navigate) => {
        const foundUser = usersData.users.find(
            (user) => user.username === username && user.password === password
        );

        if (foundUser) {
            setUser({ username: foundUser.username, role: foundUser.role });
            console.log("Login successful");
            // Redirect based on role
            if (foundUser.role === 'Team Lead') {
                navigate('/teamlead-page');
            } else if (foundUser.role === 'Manager') {
                navigate('/manager-page');
            } else if (foundUser.role === 'HR') {
                navigate('/dashboard');
            }
        } else {
            console.log("Login failed: Invalid username or password");
            setUser(null);
        }
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

export const useAuth = () => useContext(AuthContext);
