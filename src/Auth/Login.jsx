import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation } from "react-router";
import routes from "../Routes";
import useUserPermissions from "../Hooks/useUserPermissions";


export function Login() {
  const { route } = useAuthenticator((context) => [context.route, context]);
  const { addUserPermission, userPermissions} = useUserPermissions();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || routes.Home.path;


  useEffect(() => {
    const isauthenticated = async ()=>{
      if (route === "authenticated") {
        const response = await addUserPermission();
        navigate(from, { replace: true });
      }
    }

    isauthenticated();
  }, [route, navigate, from]);

  return (
    <View className="auth-wrapper">
      <Authenticator
        socialProviders={["apple", "facebook", "google"]}
      ></Authenticator>
    </View>
  );
}
