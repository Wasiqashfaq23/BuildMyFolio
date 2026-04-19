import { useNavigate } from "react-router-dom";
import { FiLayout, FiEdit3, FiLink } from "react-icons/fi";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#080808] min-h-screen">

      <nav className="flex items-center justify-between px-10 py-5 border-b border-[#1a1a1a]">
        <div className="text-xl font-bold text-[#f5f5f5] tracking-widest uppercase">
          Portfolio<span className='text-blue-700'>.</span>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer text-[#888] hover:text-[#f5f5f5] transition"
          >
            Me
          </button>
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer text-[#888] hover:text-[#f5f5f5] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#f5f5f5] text-[#080808] cursor-pointer px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="text-center px-10 pt-24 pb-16">
        <div className="inline-block border border-[#222] rounded-2xl px-4 py-1 mb-6">
          <span className="text-[11px] text-[#ffffff] tracking-widest uppercase">Portfolio.</span>
        </div>
        <h1 className="text-5xl font-medium text-[#f5f5f5] leading-tight tracking-tight max-w-2xl mx-auto mb-5">
          Build your portfolio.<br />
          <span className="text-[#333]">Land your next client.</span>
        </h1>
        <p className="text-[15px] text-[#555] max-w-md mx-auto mb-9 leading-relaxed">
          Create a stunning portfolio in minutes. Pick a template, fill your details, share your link.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#f5f5f5] cursor-pointer text-[#080808] px-7 py-3 rounded-lg text-sm font-medium hover:bg-white transition"
          >
            Create your portfolio
          </button>
          <button className="bg-transparent border cursor-pointer border-[#2a2a2a] text-[#888] px-7 py-3 rounded-lg text-sm hover:border-[#444] hover:text-[#aaa] transition">
            See examples
          </button>
        </div>
      </div>

      <div className="border-t border-[#111] mx-10" />

      <div className="grid grid-cols-3 mx-10 mt-0 rounded-xl overflow-hidden border border-[#111]">

        <div className="bg-[#080808] p-7 border-r border-[#111]">
          <div className="w-8 h-8 border border-[#222] rounded-lg flex items-center justify-center mb-4">
            <FiLayout className="text-[#555]" size={14} />
          </div>
          <div className="text-sm font-medium text-[#e5e5e5] mb-2">Pick a template</div>
          <div className="text-xs text-[#444] leading-relaxed">
            Choose from professionally designed templates built for your field.
          </div>
        </div>

        <div className="bg-[#080808] p-7 border-r border-[#111]">
          <div className="w-8 h-8 border border-[#222] rounded-lg flex items-center justify-center mb-4">
            <FiEdit3 className="text-[#555]" size={14} />
          </div>
          <div className="text-sm font-medium text-[#e5e5e5] mb-2">Fill your details</div>
          <div className="text-xs text-[#444] leading-relaxed">
            Add your work, skills, and contact info. No design skills needed.
          </div>
        </div>

        <div className="bg-[#080808] p-7">
          <div className="w-8 h-8 border border-[#222] rounded-lg flex items-center justify-center mb-4">
            <FiLink className="text-[#555]" size={14} />
          </div>
          <div className="text-sm font-medium text-[#e5e5e5] mb-2">Share your link</div>
          <div className="text-xs text-[#444] leading-relaxed">
            Get a unique link instantly. Share it with clients anywhere.
          </div>
        </div>

      </div>

      <div className="text-center px-10 py-16">
        <div className="text-[22px] font-medium text-[#f5f5f5] mb-2 tracking-tight">
          Ready to stand out?
        </div>
        <div className="text-sm text-[#444] mb-6">Create Your First Portfolio</div>
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#f5f5f5] text-[#080808] cursor-pointer px-8 py-3 rounded-lg text-sm font-medium hover:bg-white transition"
        >
          Get started for free
        </button>
      </div>

    </div>
  );
}

export default Landing;