import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, LogOut, Shield } from 'lucide-react'
import { useAdminStore } from '../../stores/adminStore'

export default function AdminLayout() {
    const logout = useAdminStore(s => s.logout)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/admin/login')
    }

    const navLinkClass = (isActive: boolean) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
            ? 'text-white'
            : 'text-slate-400 hover:text-white'
        }`

    return (
        <div className="min-h-screen" style={{ background: '#0a0a14' }}>
            {/* Top Nav */}
            <nav
                className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
                style={{
                    background: '#12121f',
                    borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(99, 102, 241, 0.1)',
                }}
            >
                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5" style={{ color: '#6366f1' }} />
                        <span className="text-lg font-bold" style={{ color: '#e2e8f0' }}>
                            OT Admin
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <NavLink
                            to="/admin/dashboard"
                            className={({ isActive }) => navLinkClass(isActive)}
                            style={({ isActive }) => isActive ? {
                                background: 'rgba(99, 102, 241, 0.15)',
                            } : {}}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/admin/logs"
                            className={({ isActive }) => navLinkClass(isActive)}
                            style={({ isActive }) => isActive ? {
                                background: 'rgba(99, 102, 241, 0.15)',
                            } : {}}
                        >
                            <FileText className="w-4 h-4" />
                            Logs
                        </NavLink>
                    </div>
                </div>

                {/* Right: Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-400 hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </nav>

            {/* Main Content */}
            <main className="p-6 max-w-screen-2xl mx-auto">
                <Outlet />
            </main>
        </div>
    )
}
