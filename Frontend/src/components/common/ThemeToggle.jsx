import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../Pages/Context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${className}`}
    >
      {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
}
