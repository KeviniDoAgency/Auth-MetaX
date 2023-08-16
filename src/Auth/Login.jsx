import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation } from "react-router";
import routes from "../Routes";
import useUserPermissions from "../Hooks/useUserPermissions";

export function Login() {
  const { route } = useAuthenticator((context) => [context.route, context]);
  const { addUserPermission, userPermissions } = useUserPermissions();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || routes.Home.path;

  const formFields = {
    signUp: {
      name: {
        order:1
      },
      family_name: {
        label: 'Last Name',
        placeholder: 'Enter your Last Name',
        order: 2
      },
      email: {
        order: 3
      },
      password: {
        order: 4
      },
      confirm_password: {
        order: 5
      }
    },
   }

  useEffect(() => {
    const isauthenticated = async () => {
      if (route === "authenticated") {
        const response = await addUserPermission();
        navigate(from, { replace: true });
      }
    };

    isauthenticated();
  }, [route, navigate, from]);

  return (
    <View className="auth-wrapper">
      <Authenticator
        socialProviders={["apple", "facebook", "google"]}
        signUpAttributes={["name", "family_name"]}
        formFields={formFields}
        loginMechanisms={['email']}
      ></Authenticator>
    </View>
  );
}
