import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard'
import LandingPage from './Pages/LandingPage'
import Onboarding from "./Pages/OnBoarding"
import DesignerPortfolio from "./Pages/Portfolios/Designer";
import PhotographerPortfolio from "./Pages/Portfolios/Photographer";
import CreatePortfolio from "./Pages/CreatePortfolio";
import Preview from "./Pages/Preview";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/designer" element={<DesignerPortfolio />} />
        <Route path="/create/:templateId" element={<CreatePortfolio />} />
        <Route path="/photographer" element={<PhotographerPortfolio />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App