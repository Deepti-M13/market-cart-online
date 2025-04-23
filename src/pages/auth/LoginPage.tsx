
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { UserRole } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface LocationState {
  from?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const from = locationState?.from || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    login(email, password, role);
    
    // After login, navigate to where the user was trying to go, or to root
    navigate(from, { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Log in to Farm Direct</CardTitle>
          <CardDescription>
            Access your account to start shopping or managing your farm
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="buyer-password">Password</Label>
                    <a href="#" className="text-xs text-farm-green hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="buyer-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  className="w-full bg-farm-green hover:bg-farm-green/90" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Demo credentials: buyer@example.com / password
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="farmer">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="farmer-password">Password</Label>
                    <a href="#" className="text-xs text-farm-green hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="farmer-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  className="w-full bg-farm-green hover:bg-farm-green/90" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Demo credentials: farmer@example.com / password
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <Link to="/auth/signup" className="text-farm-green hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
