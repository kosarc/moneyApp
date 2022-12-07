import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { isAuth, user } = useAuthContext();
  if (isAuth) {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {user && <Route path="/" element={<Home />} />}
            {!user && <Route path="/" element={<Navigate to="/login" />} />}
            {user && <Route path="/login" element={<Navigate to="/" />} />}
            {!user && <Route path="/login" element={<Login />} />}
            {user && <Route path="/signup" element={<Navigate to="/" />} />}
            {!user && <Route path="/signup" element={<Signup />} />}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
