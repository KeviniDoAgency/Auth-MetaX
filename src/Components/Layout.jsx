import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthenticator, Button, Heading, View } from "@aws-amplify/ui-react";
import Logo from "/Img/Logo.svg";
import routes from "../Routes";
import useUserPermissions from "../Hooks/useUserPermissions";
import { useEffect } from "react";

export function Layout() {
  const { route, signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user,
  ]);
  const { userPermissions, addUserPermission, loading, setUserPermissions } = useUserPermissions();
  console.log(user);
  const navigate = useNavigate();
  function logOut() {
    signOut();
    navigate(routes.Login.path);
    setUserPermissions([])
  }

  useEffect(() => {
    const verifyRoles = async () => {
      try {
        if (user) {
          console.log(user);
          await addUserPermission(user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyRoles();
  }, [user]);

  return (
    <>
      {loading ? (
        <h1>LOADING . . .</h1>
      ) : (
        <>
          <header className="header">
            <div className="contenedor nav">
              <img className="logo" src={Logo} alt="Logo" />

              <nav className="navegation">
                <Button onClick={() => navigate(routes.Home.path)}>Home</Button>
                <Button onClick={() => navigate(routes.Protected.path)}>
                  First Protected Route
                </Button>
                <Button onClick={() => navigate(routes.ProtectedSecond.path)}>
                  Second Protected Route
                </Button>
                {(userPermissions[0]?.isAdmin && user) && (
                  <Button onClick={() => navigate(routes.Admin.path)}>
                    Admin
                  </Button>
                )}
                {route !== "authenticated" ? (
                  <Button onClick={() => navigate(routes.Login.path)}>
                    Login
                  </Button>
                ) : (
                  <Button onClick={() => logOut()}>Logout</Button>
                )}
              </nav>
            </div>
          </header>
          <Heading level={1} style={{ textAlign: "center" }}>
            {" "}
            <strong>Hello {user?.username}!!</strong>{" "}
            <p>Example Auth Routes App</p>
          </Heading>
          <View>
            {route === "authenticated" ? "You are logged in!" : "Please Login!"}
          </View>
          <Outlet />
        </>
      )}
    </>
  );
}
