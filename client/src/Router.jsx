import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import Ledger from "./pages/Ledger";
import useToken from "./components/useToken";
import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/Profile";
//Alternate Login
//import Homepage from "./components/Homepage";

const Router = () => {
  const { token, removeToken, setToken } = useToken();
  return (
    <BrowserRouter>
      <div className="App">
        <Header token={removeToken} />
        {!token && token !== "" && token !== undefined ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Routes>
              <Route
                exact
                path="/profile"
                element={<Profile token={token} setToken={setToken} />}
              ></Route>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/ledger" element={<Ledger />} />
              <Route element={<NotFound />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

/* const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}; */

export default Router;
