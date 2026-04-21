import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import LandingPage from './Pages/LandingPage';
import CreatePortfolio from "./Pages/CreatePortfolio";
import Preview from "./Pages/Preview";
import Templates from "./Pages/Template";
import AdminUploadTemplate from "./Pages/UploadTemplate";
import PublicPortfolio from "./Pages/PublicPortfolio";
import ProtectedRoute from "./Pages/ProtectedRoutes";
import { AuthProvider } from "./Pages/Context/AuthProvider";
import OnBoarding from "./Pages/OnBoarding";
import EditPortfolio from "./Pages/EditPortfolio";


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/p/:slug" element={<PublicPortfolio />} />

          {/* protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/create/:templateId" element={<ProtectedRoute><CreatePortfolio /></ProtectedRoute>} />
          <Route path="/preview" element={<ProtectedRoute><Preview /></ProtectedRoute>} />
          <Route path="/edit/:portfolioId" element={<ProtectedRoute><EditPortfolio /></ProtectedRoute>} />

          {/* admin only */}
          <Route path="/admin/template/upload" element={
            <ProtectedRoute adminOnly>
              <AdminUploadTemplate />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;