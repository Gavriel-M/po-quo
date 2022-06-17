import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import NavbarComponent2 from "./components/NavbarComponent2";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import QuotesPage from "./pages/QuotesPage";
import AddQuotePage from "./pages/AddQuotePage";
import AuthGuardWrapper from "./components/AuthGuardWrapper";
import UserQuotesPage from "./pages/UserQuotesPage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="App">
      <NavbarComponent2></NavbarComponent2>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} exact />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route
          path="/resetpassword/:usermail/:token"
          element={<ResetPasswordPage />}
        />

        <Route element={<AuthGuardWrapper />}>
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/addquote" element={<AddQuotePage />} />
          <Route path="/userquotes" element={<UserQuotesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}


export default App;
