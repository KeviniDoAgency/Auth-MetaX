import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import routes from "../Routes";
import useUserPermissions from "../Hooks/useUserPermissions";
import { useEffect } from "react";

const Admin = () => {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  const { userPermissions, addUserPermission } = useUserPermissions();
  
    if (!userPermissions[0]?.isAdmin)
    return (
      <Navigate to={routes.Home.path} state={{ from: location }} replace />
    );
  
  return <div>Admin</div>;
};

export default Admin;
