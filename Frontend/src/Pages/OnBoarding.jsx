import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const line1 = "Welcome.";
const line2 = "Let's create your portfolio.";

function Onboarding() {
    const [displayed, setDisplayed] = useState("");
    const [phase, setPhase] = useState("line1");
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let i = 0;
        let timeout;

        if (phase === "line1") {
            const interval = setInterval(() => {
                setDisplayed(line1.slice(0, i + 1));
                i++;
                if (i === line1.length) {
                    clearInterval(interval);
                    timeout = setTimeout(() => {
                        setDisplayed("");
                        setPhase("line2");
                    }, 1000);
                }
            }, 80);
            return () => { clearInterval(interval); clearTimeout(timeout); };
        }

        if (phase === "line2") {
            const interval = setInterval(() => {
                setDisplayed(line2.slice(0, i + 1));
                i++;
                if (i === line2.length) {
                    clearInterval(interval);
                    timeout = setTimeout(() => setShowButton(true), 400);
                }
            }, 60);
            return () => { clearInterval(interval); clearTimeout(timeout); };
        }
    }, [phase]);

    return (
        <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4">

            <h1 className="text-4xl font-medium text-[#f5f5f5] tracking-tight min-h-12 text-center">
                {displayed}
                <span className="animate-pulse text-[#444]">|</span>
            </h1>

            {showButton && (
                <button
                    onClick={() => navigate("/templates")}
                    className="mt-10 bg-[#f5f5f5] text-[#080808] px-7 py-3 rounded-lg text-sm font-medium hover:bg-white transition opacity-0 animate-fadein"
                >
                    Lets Go!
                </button>
            )}

        </div>
    );
}

export default Onboarding;