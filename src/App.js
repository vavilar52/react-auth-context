import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import { AuthProvider } from "./context";
import { PrivateRoute } from "./components";
import { ROUTE } from "./constants/routes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={ROUTE.HOME} element={<Home />} />
          </Route>
          <Route path={ROUTE.LOGIN} element={<Login />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
