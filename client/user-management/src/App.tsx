import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import "./index.css";
import UsersPage from "./pages/UsersPage";
import AboutProject from "./pages/AboutProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="about" element={<AboutProject />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
