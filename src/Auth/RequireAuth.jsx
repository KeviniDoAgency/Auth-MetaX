import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import routes from "../Routes";

export function RequireAuth({ children }) {
  const location = useLocation();
  const { route, user } = useAuthenticator((context) => [context.route, context.user]);
  if (route !== "authenticated") {
    return <Navigate to={routes.Login.path} state={{ from: location }} replace />;
  }
  return children;
}
