import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit2, FiEye, FiTrash2, FiLogOut, FiExternalLink } from 'react-icons/fi'
import { useAuth } from './Context/AuthContext'

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetch(`${VITE_API_URL}/portfolio/all`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setPortfolios(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load portfolios"))
      .finally(() => setLoading(false))
  }, [user?.id])

  async function handleDelete(id) {
    if (!confirm("Delete this portfolio?")) return
    setDeletingId(id)
    try {
      const res = await fetch(`${VITE_API_URL}/portfolio/${id}`, { method: "DELETE", credentials: "include" })
      if (!res.ok) throw new Error()
      setPortfolios(prev => prev.filter(p => p._id !== id))
    } catch {
      alert("Failed to delete portfolio")
    } finally {
      setDeletingId(null)
    }
  }

  const publishedCount = portfolios.filter(p => p.slug).length

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] p-4 sm:p-6 lg:p-8">

      {/* Nav */}
      <nav className="flex justify-between items-center mb-8 sm:mb-10 border-b border-[#1a1a1a] pb-4 sm:pb-5">
        <h1 className="text-base sm:text-xl font-bold tracking-widest uppercase">Portfolio.</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline text-sm text-[#555]">Welcome, {user?.email.split('@')[0]}</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 border cursor-pointer border-[#222] text-[#888] px-3 py-1.5 rounded-lg text-sm hover:border-[#444] hover:text-[#f5f5f5] transition"
          >
            <FiLogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-medium tracking-tight mb-1">Dashboard</h2>
        <p className="text-sm text-[#555]">Manage your portfolios</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {[
          { label: "Total Portfolios", value: portfolios.length },
          { label: "Published", value: publishedCount },
          { label: "Drafts", value: portfolios.length - publishedCount },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#444] rounded-xl p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-[#444] mb-1 sm:mb-2 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-xl sm:text-2xl font-medium text-[#f5f5f5]">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Portfolio list header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#888]">Your Portfolios</h3>
        <button
          onClick={() => navigate('/templates')}
          className="flex items-center gap-2 bg-[#f5f5f5] text-[#080808] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-white cursor-pointer transition"
        >
          <FiPlus size={14} />
          <span>Create New</span>
        </button>
      </div>

      {/* States */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-[#555] text-sm">Loading portfolios...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      ) : portfolios.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[#1a1a1a] rounded-xl">
          <p className="text-[#444] text-sm mb-3">No portfolios yet</p>
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-2 bg-[#f5f5f5] text-[#080808] px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition"
          >
            <FiPlus size={14} />
            Create your first portfolio
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {portfolios.map((p) => {
            const name = p.userData?.hero?.fullName || "Untitled"
            const publicUrl = `${window.location.origin}/p/${p.slug}`

            return (
              <div
                key={p._id}
                className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-[#2a2a2a] transition"
              >
                {/* Info */}
                <div className="flex flex-col gap-1 min-w-0">
                  <h4 className="text-sm font-medium text-[#e5e5e5] truncate">{name}</h4>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full border border-[#1a3a1a] text-[#4a9a4a] shrink-0">
                      PUBLISHED
                    </span>
                    {p.slug && (
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#444] hover:text-[#888] flex items-center gap-1 transition truncate max-w-45 sm:max-w-xs"
                      >
                        <span className="truncate">{publicUrl}</span>
                        <FiExternalLink size={10} className="shrink-0" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate(`/p/${p.slug}`)}
                    className="flex items-center gap-1.5 cursor-pointer border border-[#222] text-[#666] px-3 py-1.5 rounded-lg text-xs hover:border-[#444] hover:text-[#f5f5f5] transition"
                  >
                    <FiEye size={11} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${p._id}`)}
                    className="flex items-center gap-1.5 cursor-pointer border border-[#222] text-[#666] px-3 py-1.5 rounded-lg text-xs hover:border-[#444] hover:text-[#f5f5f5] transition"
                  >
                    <FiEdit2 size={11} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={deletingId === p._id}
                    className="flex items-center gap-1.5 cursor-pointer border border-[#222] text-[#666] px-3 py-1.5 rounded-lg text-xs hover:border-[#3a1a1a] hover:text-red-400 transition disabled:opacity-40"
                  >
                    <FiTrash2 size={11} />
                    <span>{deletingId === p._id ? "Deleting..." : "Delete"}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dashboard