import { motion } from "framer-motion";
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SignUp = () => {
  return (
    <div className="min-h-screen page-section flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="surface-card border border-border/60">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Use email/password or social login</CardDescription>
          </CardHeader>
          <CardContent>
            <ClerkSignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" redirectUrl="/" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
