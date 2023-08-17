import { useAuthenticator } from "@aws-amplify/ui-react";

const useDataUser = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const clientId = user?.pool?.clientId;
  const userPoolId = user?.pool?.userPoolId;
  const tokenUse = user?.signInUserSession?.accessToken?.payload?.token_use;
  const jwtToken = user?.signInUserSession?.accessToken?.jwtToken;

  return {
    clientId,
    userPoolId,
    tokenUse,
    jwtToken,
  };
};

export default useDataUser;
