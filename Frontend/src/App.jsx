import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import LandingPage from './Pages/LandingPage';
import CreatePortfolio from "./Pages/CreatePortfolio";
import Templates from "./Pages/Template";
import AdminUploadTemplate from "./Pages/UploadTemplate";
import PublicPortfolio from "./Pages/PublicPortfolio";
import ProtectedRoute from "./Pages/ProtectedRoutes";
import EditPortfolio from "./Pages/EditPortfolio";
import SSOCallback from "./Pages/SSOCallback";
import OAuthSync from "./Pages/OAuthSync";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/p/:slug" element={<PublicPortfolio />} />
      <Route path="/sso-callback" element={<SSOCallback />} />
      <Route path="/oauth-sync" element={<OAuthSync />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
      <Route path="/create/:templateId" element={<ProtectedRoute><CreatePortfolio /></ProtectedRoute>} />
      <Route path="/edit/:portfolioId" element={<ProtectedRoute><EditPortfolio /></ProtectedRoute>} />

      <Route path="/admin/template/upload" element={
        <ProtectedRoute adminOnly>
          <AdminUploadTemplate />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
