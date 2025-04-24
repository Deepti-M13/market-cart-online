
import { Link } from "react-router-dom";
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
import { SignupForm } from "./SignupForm";
import { UserRole } from "@/types";

export const SignupContainer = () => {
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
          <Tabs defaultValue="buyer" onValueChange={(value) => {}}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
              <TabsTrigger value="farmer">I'm a Farmer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer">
              <SignupForm role="buyer" namePlaceholder="John Doe" />
            </TabsContent>
            
            <TabsContent value="farmer">
              <SignupForm role="farmer" namePlaceholder="Green Acres Farm" />
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
