import { useContext } from "react";
import UserPermissionsContext from "../Context/UserPermissionsProvaider";


const useUserPermissions = () => {
  return useContext(UserPermissionsContext);
};

export default useUserPermissions;