import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const plans = [
  { name: "Free", price: "$0", limits: "100k requests/mo", features: ["Email support", "Shared infra"], cta: "/register" },
  { name: "Pro", price: "$49", limits: "1M requests/mo", features: ["Priority support", "Audit logs", "Better limits"], cta: "/register", badge: "Popular" },
  { name: "Enterprise", price: "Let's talk", limits: "Custom", features: ["Dedicated support", "SAML/SCIM", "Custom SLAs"], cta: "/contact" },
];

const Pricing = () => (
  <PublicLayout>
    <section className="container mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Pricing that scales with you</h1>
        <p className="text-muted-foreground">Start for free, upgrade when you need more throughput and governance.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                {plan.name} {plan.badge && <Badge variant="secondary">{plan.badge}</Badge>}
              </CardTitle>
              <p className="text-3xl font-semibold">{plan.price}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
              <p className="text-sm text-muted-foreground">{plan.limits}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground flex-1">
              {plan.features.map((f) => (
                <div key={f}>• {f}</div>
              ))}
            </CardContent>
            <CardFooter>
              {plan.cta.startsWith('/') ? (
                <Link to={plan.cta} className="w-full">
                  <Button className="w-full">{plan.name === 'Enterprise' ? 'Contact sales' : 'Choose plan'}</Button>
                </Link>
              ) : (
                <a href={plan.cta} className="w-full">
                  <Button className="w-full">Learn more</Button>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  </PublicLayout>
);

export default Pricing;
