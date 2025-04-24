
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRole } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface SignupFormProps {
  role: UserRole;
  namePlaceholder: string;
}

export const SignupForm = ({ role, namePlaceholder }: SignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword() || !agreeTerms) return;
    
    signup(name, email, password, role);
    
    // Navigate to appropriate page based on role
    if (role === "farmer") {
      navigate("/farmer/dashboard");
    } else {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${role}-name`}>Full Name</Label>
        <Input 
          id={`${role}-name`}
          type="text" 
          placeholder={namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input 
          id={`${role}-email`}
          type="email" 
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input 
          id={`${role}-password`}
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${role}-confirm-password`}>Confirm Password</Label>
        <Input 
          id={`${role}-confirm-password`}
          type="password" 
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`${role}-terms`}
          checked={agreeTerms}
          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
        />
        <label
          htmlFor={`${role}-terms`}
          className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the <a href="#" className="text-farm-green hover:underline">Terms of Service</a> and <a href="#" className="text-farm-green hover:underline">Privacy Policy</a>
        </label>
      </div>
      
      <Button 
        className="w-full bg-farm-green hover:bg-farm-green/90" 
        type="submit"
        disabled={isLoading || !agreeTerms}
      >
        {isLoading ? "Creating Account..." : `Sign Up as ${role === 'farmer' ? 'Farmer' : 'Buyer'}`}
      </Button>
    </form>
  );
};
