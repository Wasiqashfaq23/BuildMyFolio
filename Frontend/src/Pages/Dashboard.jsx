import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiFolder, FiCheckCircle, FiEdit, FiTrash2, FiExternalLink, FiLogOut, FiEye } from 'react-icons/fi'
import logo from '../assets/logo.png'
import { useAuth } from './Context/AuthContext'
import Spinner from '../components/common/Spinner'
import ThemeToggle from '../components/common/ThemeToggle'

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingId, setDeletingId] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  useEffect(() => {
    fetch(`${VITE_API_URL}/portfolio/all`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setPortfolios(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load portfolios"))
      .finally(() => setLoading(false))
  }, [user?.id])

  async function handleDelete(id) {
    setDeleteConfirmId(null)
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
  const totalViews = portfolios.reduce((sum, p) => sum + (p.views || 0), 0)
  const displayName = user?.email?.split('@')[0]?.replace(/^./, c => c.toUpperCase()) || 'User'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button onClick={() => navigate("/dashboard")} className="flex items-center" aria-label="Go to dashboard">
              <img src={logo} alt="BuildMyFolio" className="h-10" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">{displayName}</span>
              <ThemeToggle />
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Sign out"
              >
                <FiLogOut size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Welcome back, {displayName}</p>
          </div>
          <button
            onClick={() => navigate('/templates')}
            disabled={portfolios.length >= 3}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            aria-label="Create a new portfolio"
            title={portfolios.length >= 3 ? "Maximum 3 portfolios allowed" : ""}
          >
            <FiPlus size={15} aria-hidden="true" />
            <span className="hidden sm:inline">{portfolios.length >= 3 ? "Limit Reached" : "New Portfolio"}</span>
            <span className="sm:hidden">{portfolios.length >= 3 ? "Max" : "New"}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6" aria-label="Portfolio statistics">
          {[
            { label: "Total", value: portfolios.length },
            { label: "Published", value: publishedCount },
            { label: "Total Views", value: totalViews },
            { label: "Drafts", value: portfolios.length - publishedCount, hidden: true },
          ].map(({ label, value, hidden }) => (
            <div key={label} className={`bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700/60${hidden ? " hidden sm:block" : ""}`}>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
            </div>
          ))}
        </div>

        {/* Portfolio List */}
        <section aria-labelledby="portfolios-heading">
          <h2 id="portfolios-heading" className="sr-only">Your Portfolios</h2>

          {loading ? (
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/60 flex items-center justify-center py-20">
              <Spinner size="md" />
            </div>
          ) : error ? (
            <div role="alert" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          ) : portfolios.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/60 text-center py-16 px-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <FiFolder className="text-slate-400 dark:text-slate-500" size={22} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">No portfolios yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Create your first portfolio to get started</p>
              <button
                onClick={() => navigate('/templates')}
                className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <FiPlus size={15} aria-hidden="true" />
                Choose a Template
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolios.map((portfolio) => (
                <article
                  key={portfolio._id}
                  className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {portfolio.templateId?.templateName || "My Portfolio"}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs flex items-center gap-1.5">
                        {portfolio.slug ? (
                          <>
                            <FiCheckCircle size={11} className="text-green-600 dark:text-green-400" aria-hidden="true" />
                            <span className="text-green-600 dark:text-green-400 font-medium">Published</span>
                          </>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500">Draft</span>
                        )}
                      </p>
                      {portfolio.views > 0 && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <FiEye size={11} aria-hidden="true" />
                          {portfolio.views} view{portfolio.views !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {portfolio.slug && (
                      <a
                        href={`/p/${portfolio.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center gap-1"
                        aria-label={`View ${portfolio.name || "portfolio"} live`}
                      >
                        <FiExternalLink size={12} aria-hidden="true" />
                        View
                      </a>
                    )}
                    <button
                      onClick={() => navigate(`/edit/${portfolio._id}`)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
                      aria-label={`Edit ${portfolio.name || "portfolio"}`}
                    >
                      <FiEdit size={12} aria-hidden="true" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(portfolio._id)}
                      disabled={deletingId === portfolio._id}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center gap-1"
                      aria-label={`Delete ${portfolio.name || "portfolio"}`}
                    >
                      {deletingId === portfolio._id ? (
                        <Spinner size="sm" className="border-red-200 border-t-red-600" />
                      ) : (
                        <FiTrash2 size={12} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Sign-out confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/60 p-6 w-full max-w-sm">
            <h2 id="logout-title" className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sign out?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Are you sure you want to sign out of your account?</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowLogoutConfirm(false); logout(); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={() => setDeleteConfirmId(null)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/60 p-6 w-full max-w-sm">
            <h2 id="delete-title" className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete portfolio?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">This action cannot be undone. Your portfolio will be permanently removed.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
