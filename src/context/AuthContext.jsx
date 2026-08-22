import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

// Simulated user data — will be replaced by API calls
const DEMO_USERS = {
  "admin@wavora.com": { id: "1", name: "Admin User", email: "admin@wavora.com", role: "admin" },
  "member@wavora.com": { id: "2", name: "Sarah Johnson", email: "member@wavora.com", role: "member" },
  "staff@wavora.com": { id: "3", name: "Alex Thompson", email: "staff@wavora.com", role: "staff" },
  "org@wavora.com": { id: "4", name: "Wavora Org", email: "org@wavora.com", role: "organization" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("wavora_token");
      const savedUser = localStorage.getItem("wavora_user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem("wavora_token");
      localStorage.removeItem("wavora_user");
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const demoUser = DEMO_USERS[email];
    if (!demoUser) {
      throw new Error("Invalid email or password");
    }

    // In production, this would come from the backend
    const mockToken = `mock_jwt_${Date.now()}_${demoUser.role}`;

    localStorage.setItem("wavora_token", mockToken);
    localStorage.setItem("wavora_user", JSON.stringify(demoUser));
    setToken(mockToken);
    setUser(demoUser);
    return demoUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("wavora_token");
    localStorage.removeItem("wavora_user");
    setToken(null);
    setUser(null);
  }, []);

  const switchRole = useCallback((newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem("wavora_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  }, [user]);

  const isAuthenticated = !!token && !!user;

  const hasRole = useCallback(
    (requiredRole) => {
      if (!user) return false;
      if (Array.isArray(requiredRole)) return requiredRole.includes(user.role);
      return user.role === requiredRole;
    },
    [user]
  );

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    switchRole,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
