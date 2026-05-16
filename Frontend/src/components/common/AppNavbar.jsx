import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../../assets/logo.png";

const AppNavbar = ({ backTo, backLabel }) => {
  const navigate = useNavigate();

  const logoEl = (
    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center"
      aria-label="Go to dashboard"
    >
      <img src={logo} alt="BuildMyFolio" className="h-10" />
    </button>
  );

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {backTo ? (
            <>
              <button
                onClick={() => navigate(backTo)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                aria-label={backLabel || "Go back"}
              >
                <FiArrowLeft size={16} aria-hidden="true" />
                <span className="hidden sm:inline">{backLabel || "Back"}</span>
              </button>
              {logoEl}
            </>
          ) : (
            <>
              {logoEl}
              <div />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
