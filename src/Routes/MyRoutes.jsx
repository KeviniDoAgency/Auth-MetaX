import { RequireAuth } from "../Auth/RequireAuth";
import { Home } from "../Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { Login } from "../Auth/Login";
import { ProtectedFirst } from "../Components/ProtectedFirst";
import { ProtectedSecond } from "../Components/ProtectedSecond";
import routes from ".";
import Admin from "../Components/Admin";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.Home.path} element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path={routes.Protected.path}
            element={
              <RequireAuth>
                <ProtectedFirst />
              </RequireAuth>
            }
          />
          <Route
            path={routes.ProtectedSecond.path}
            element={
              <RequireAuth>
                <ProtectedSecond />
              </RequireAuth>
            }
          />
          <Route
            path={routes.Admin.path}
            element={
              <RequireAuth>
                <Admin/>
              </RequireAuth>
            }
          />
          <Route path={routes.Login.path} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
