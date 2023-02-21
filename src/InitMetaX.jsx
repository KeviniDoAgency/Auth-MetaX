import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import MyRoutes from "./Routes/MyRoutes";
import { UserPermissionsProvaider } from "./Context/UserPermissionsProvaider";

function InitMetaX() {

  return (
    <>
      <div className="init-Meta">
        <UserPermissionsProvaider>
          <Authenticator.Provider>
            <MyRoutes />
          </Authenticator.Provider>
        </UserPermissionsProvaider>
      </div>
    </>
  );
}

export default InitMetaX;
