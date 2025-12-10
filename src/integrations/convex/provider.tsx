import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/clerk-react";
import { convex } from "./client";

interface Props {
  children: ReactNode;
}

export const ConvexAppProvider = ({ children }: Props) => (
  <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    {children}
  </ConvexProviderWithClerk>
);

export default ConvexAppProvider;
