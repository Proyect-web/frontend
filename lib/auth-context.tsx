"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    setAuth: (token: string) => void;
    logout: () => void;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Función para verificar autenticación
    const checkAuth = () => {
        const storedToken = localStorage.getItem("auth_token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setToken(null);
            setIsAuthenticated(false);
        }
    };

    // Verificar autenticación al montar el componente
    useEffect(() => {
        checkAuth();
        setIsInitialized(true);

        // Escuchar cambios en localStorage (para sincronización entre tabs)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "auth_token") {
                checkAuth();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // Escuchar evento personalizado para actualizar auth
        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener("auth-change", handleAuthChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("auth-change", handleAuthChange);
        };
    }, []);

    // Función para establecer autenticación
    const setAuth = (newToken: string) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
        setIsAuthenticated(true);

        // Disparar evento personalizado para actualizar otros componentes
        window.dispatchEvent(new Event("auth-change"));
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setIsAuthenticated(false);

        // Disparar evento personalizado
        window.dispatchEvent(new Event("auth-change"));
    };

    // No renderizar children hasta que se haya verificado la autenticación
    if (!isInitialized) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, setAuth, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}
