
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserRole } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");
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
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Join Farm Direct to buy fresh produce or sell your farm products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buyer" onValueChange={(value) => setRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
              <TabsTrigger value="farmer">I'm a Farmer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-name">Full Name</Label>
                  <Input 
                    id="buyer-name" 
                    type="text" 
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buyer-email">Email</Label>
                  <Input 
                    id="buyer-email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buyer-password">Password</Label>
                  <Input 
                    id="buyer-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buyer-confirm-password">Confirm Password</Label>
                  <Input 
                    id="buyer-confirm-password" 
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
                    id="buyer-terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                  />
                  <label
                    htmlFor="buyer-terms"
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
                  {isLoading ? "Creating Account..." : "Sign Up as Buyer"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="farmer">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">Farm Name</Label>
                  <Input 
                    id="farmer-name" 
                    type="text" 
                    placeholder="Green Acres Farm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farmer-email">Email</Label>
                  <Input 
                    id="farmer-email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farmer-password">Password</Label>
                  <Input 
                    id="farmer-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farmer-confirm-password">Confirm Password</Label>
                  <Input 
                    id="farmer-confirm-password" 
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
                    id="farmer-terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                  />
                  <label
                    htmlFor="farmer-terms"
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
                  {isLoading ? "Creating Account..." : "Sign Up as Farmer"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-farm-green hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
