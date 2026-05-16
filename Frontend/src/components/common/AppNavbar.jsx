import { useNavigate } from "react-router-dom";
import { FiLayout, FiArrowLeft } from "react-icons/fi";

const AppNavbar = ({ backTo, backLabel }) => {
  const navigate = useNavigate();

  const logo = (
    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center gap-2.5"
      aria-label="Go to dashboard"
    >
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center" aria-hidden="true">
        <FiLayout className="text-white" size={15} />
      </div>
      <span className="text-base font-bold text-slate-900 hidden sm:inline">BuildMyFolio</span>
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
              {logo}
            </>
          ) : (
            <>
              {logo}
              <div />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
