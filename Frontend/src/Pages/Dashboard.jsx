import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit2, FiEye, FiTrash2, FiLogOut } from 'react-icons/fi'
import { useAuth } from './Context/AuthContext'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [portfolios] = useState([
    { title: "Professional Web Designer", status: "PUBLISHED", views: 1200, link: "alifrag-portfolio.dev" },
    { title: "Full Stack Developer", status: "PUBLISHED", views: 950, link: "wasiqsite.dev" },
    { title: "Side Projects & Experiments", status: "DRAFT", views: 0, link: "Not published" }
  ])

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] p-8">

      <nav className="flex justify-between items-center mb-10 border-b border-[#1a1a1a] pb-5">
        <h1 className="text-xl font-bold tracking-widest uppercase">Portfolio.</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#555]">Welcome, {user?.email}</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 border cursor-pointer border-[#222] text-[#888] px-3 py-1.5 rounded-lg text-sm hover:border-[#444] hover:text-[#f5f5f5] transition"
          >
            <FiLogOut size={13} />
            Logout
          </button>
        </div>
      </nav>

      <header className="mb-8">
        <h2 className="text-2xl font-medium tracking-tight mb-1">Dashboard</h2>
        <p className="text-sm text-[#555]">Manage your portfolios and track your progress</p>
      </header>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Portfolios", value: portfolios.length },
          { label: "Published", value: portfolios.filter(p => p.status === "PUBLISHED").length },
          { label: "Total Views", value: "1.2k" },
          { label: "Monthly Views", value: "340" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#444] rounded-xl p-4">
            <p className="text-xs text-[#444] mb-2 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-medium text-[#f5f5f5]">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#888]">Your Portfolios</h3>
        <button
          onClick={() => navigate('/templates')}
          className="flex items-center gap-2 bg-[#f5f5f5] text-[#080808] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer transition"
        >
          <FiPlus size={14} />
          Create New
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {portfolios.map((p, index) => (
          <div
            key={index}
            className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl px-5 py-4 flex items-center justify-between hover:border-[#2a2a2a] transition"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-medium text-[#e5e5e5]">{p.title}</h4>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${p.status === "PUBLISHED" ? "border-[#1a3a1a] text-[#4a9a4a]" : "border-[#2a2a1a] text-[#7a7a3a]"}`}>
                  {p.status}
                </span>
                <span className="text-xs text-[#444]">{p.views} views</span>
                <span className="text-xs text-[#333]">{p.link}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 cursor-pointer border border-[#222] text-[#666] px-3 py-1.5 rounded-lg text-xs hover:border-[#444] hover:text-[#f5f5f5] transition">
                <FiEdit2 size={11} />
                Edit
              </button>
              <button className="flex items-center gap-1.5 cursor-pointer border border-[#222] text-[#666] px-3 py-1.5 rounded-lg text-xs hover:border-[#444] hover:text-[#f5f5f5] transition">
                <FiEye size={11} />
                View
              </button>
              <button className="flex items-center gap-1.5 cursor-pointer border border-[#222] text-[#666] px-3 py-1.5 rounded-lg text-xs hover:border-[#3a1a1a] hover:text-red-400 transition">
                <FiTrash2 size={11} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Dashboard