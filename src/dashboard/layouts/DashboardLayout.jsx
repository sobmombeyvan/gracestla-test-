import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../styles/dashboard.css';

const DashboardLayout = ({ children, sidebarItems, user, roleLabel }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/dashboard');
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('dashboard-nav-open', sidebarOpen);
    return () => document.body.classList.remove('dashboard-nav-open');
  }, [sidebarOpen]);

  return (
    <div className="dashboard-wrapper">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dashboard-sidebar-header">
          <img
            src="https://i.ibb.co/hJZCdQZV/a58c51a0-e528-4428-9001-dc5f2980819c.jpg"
            alt="Grâce est là"
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2>Grâce est là</h2>
            <span>{roleLabel}</span>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((section, idx) => (
            <React.Fragment key={idx}>
              {section.label && <p className="sidebar-section-label">{section.label}</p>}
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  {item.name}
                  {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                </Link>
              ))}
            </React.Fragment>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="sidebar-avatar sidebar-avatar-img" />
            ) : (
              <div className="sidebar-avatar">{user.initials}</div>
            )}
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">{user.role}</div>
            </div>
          </div>
          <button type="button" className="sidebar-logout-btn" onClick={handleSignOut}>
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
          </div>
          <div className="topbar-right">
            <Link to="/" className="dash-btn dash-btn-outline dash-btn-sm">
              Site public
            </Link>
            <button type="button" className="dash-btn dash-btn-outline dash-btn-sm" onClick={handleSignOut}>
              Déconnexion
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
