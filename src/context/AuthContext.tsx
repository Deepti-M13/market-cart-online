
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "../types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // In a real app, these would connect to a backend API
  const login = (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo users for testing
      if (role === 'buyer' && email === 'buyer@example.com' && password === 'password') {
        const user: User = {
          id: 'buyer-1',
          name: 'Demo Buyer',
          email: 'buyer@example.com',
          role: 'buyer'
        };
        setUser(user);
        localStorage.setItem('farmMarketUser', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else if (role === 'farmer' && email === 'farmer@example.com' && password === 'password') {
        const user: User = {
          id: 'farmer-1',
          name: 'Demo Farmer',
          email: 'farmer@example.com',
          role: 'farmer'
        };
        setUser(user);
        localStorage.setItem('farmMarketUser', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        // Check if user exists in localStorage from previous signup
        const savedUsers = localStorage.getItem('farmMarketUsers');
        const users = savedUsers ? JSON.parse(savedUsers) : [];
        
        const foundUser = users.find((u: User) => 
          u.email === email && u.role === role
        );
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('farmMarketUser', JSON.stringify(foundUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid credentials. Please try again.",
          });
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const signup = (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: `${role}-${Date.now()}`,
        name,
        email,
        role
      };
      
      // Save user to "database" (localStorage in this case)
      const savedUsers = localStorage.getItem('farmMarketUsers');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      users.push({...newUser, password}); // Store password for demo purposes
      localStorage.setItem('farmMarketUsers', JSON.stringify(users));
      
      // Log in the user right after signup
      setUser(newUser);
      localStorage.setItem('farmMarketUser', JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: `Welcome to Farm Direct, ${name}!`,
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmMarketUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Check for existing user session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('farmMarketUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
