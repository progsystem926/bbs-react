import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import { createContext, useState } from "react";

export const LoginUsernameContext = createContext(
  {} as {
    loginUsername: string;
    setLoginUsername: React.Dispatch<React.SetStateAction<string>>;
  }
);

function App() {
  const [loginUsername, setLoginUsername] = useState(
    localStorage.getItem("username") || ""
  );

  return (
    <LoginUsernameContext.Provider value={{ loginUsername, setLoginUsername }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </LoginUsernameContext.Provider>
  );
}

export default App;
