import { useState, createContext } from "react";
import axios from "axios";

const UserPermissionsContext = createContext();

const UserPermissionsProvaider = ({ children }) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const addUserPermission = async (user) => {
    if (user === undefined) return;

    try {
      setLoading(true)
      const {pool: { clientId, userPoolId },signInUserSession: { idToken },username,} = user;

      const URL = `https://3q5x11oei7.execute-api.us-east-1.amazonaws.com/prod/permissionByUser/${username}`;
      const data = JSON.stringify([
        {
          isAdmin: false,
        },
      ]);

      let config = {
        method: 'put',
        url: URL,
        headers:{
          userPoolId,
          tokenUse: idToken.payload.token_use,
          clientId,
          Authorization: `Bearer ${idToken.jwtToken}`,
          "Content-Type": "application/json",
        },
        data,
      };

      const response = await axios(config);
      setUserPermissions(response.data.body.data);
      setLoading(false)
     // setUserPermissions(response.data?.body?.data?.permissions);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  };

  return (
    <UserPermissionsContext.Provider
      value={{ addUserPermission, userPermissions,loading, setUserPermissions }}
    >
      {children}
    </UserPermissionsContext.Provider>
  );
};

export { UserPermissionsProvaider };

export default UserPermissionsContext;
