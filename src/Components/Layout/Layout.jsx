import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/employees', label: 'Employees', icon: '👥' },
    { href: '/candidates', label: 'Candidates', icon: '🧑‍💼' },
    { href: '/jobs', label: 'Jobs', icon: '💼' },
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">HR Portal</h1>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className={`nav-item ${location.pathname === item.href ? 'nav-item-active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top navigation */}
 

        {/* Page content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}