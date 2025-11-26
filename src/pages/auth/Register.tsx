import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Register = () => (
  <PublicLayout>
    <section className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <p className="text-sm text-muted-foreground">Creates your user and default organization.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input placeholder="Your name" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Create account</Button>
          <div className="text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary">Login</Link>
          </div>
        </CardContent>
      </Card>
    </section>
  </PublicLayout>
);

export default Register;
