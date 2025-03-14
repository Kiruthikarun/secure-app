import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock financial data for dashboard
  const accountBalance = "87,429.63";
  const accounts = [
    { id: 1, name: "Checking", number: "****4218", balance: "12,582.47", currency: "USD" },
    { id: 2, name: "Savings", number: "****7693", balance: "54,321.16", currency: "USD" },
    { id: 3, name: "Investment", number: "****3904", balance: "20,526.00", currency: "USD" }
  ];
  
  const recentTransactions = [
    { id: 1, date: "Mar 13, 2025", description: "Amazon.com", category: "Shopping", amount: "-142.87", status: "completed" },
    { id: 2, date: "Mar 12, 2025", description: "Salary Deposit", category: "Income", amount: "+4,850.00", status: "completed" },
    { id: 3, date: "Mar 10, 2025", description: "Starbucks", category: "Dining", amount: "-8.45", status: "completed" },
    { id: 4, date: "Mar 08, 2025", description: "Utility Bill", category: "Bills", amount: "-145.30", status: "completed" },
    { id: 5, date: "Mar 05, 2025", description: "Target", category: "Shopping", amount: "-87.64", status: "completed" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/");
    } else {
      setUsername(DOMPurify.sanitize(storedUsername));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">F</span>
          </div>
          <h3 className="sidebar-title">FinTrack</h3>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active">
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">💰</span>
              <span className="nav-text">Accounts</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">📝</span>
              <span className="nav-text">Transactions</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">📈</span>
              <span className="nav-text">Investments</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">🔔</span>
              <span className="nav-text">Alerts</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="dashboard-header">
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
          <div className="header-title">Dashboard</div>
          <div className="user-profile">
            <span className="welcome-text">Welcome,</span>
            <span className="username">{username || "User"}</span>
            <div className="avatar">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Balance Summary */}
          <section className="dashboard-card balance-summary">
            <h3>Total Balance</h3>
            <div className="balance-amount">${accountBalance}</div>
            <div className="balance-date">As of March 14, 2025</div>
            <button className="primary-button sm">Transfer Funds</button>
          </section>
          
          {/* Accounts Overview */}
          <section className="dashboard-card accounts-section">
            <div className="card-header">
              <h3>Your Accounts</h3>
              <button className="text-button">View All</button>
            </div>
            <div className="accounts-list">
              {accounts.map(account => (
                <div className="account-item" key={account.id}>
                  <div className="account-info">
                    <div className="account-name">{account.name}</div>
                    <div className="account-number">{account.number}</div>
                  </div>
                  <div className="account-balance">
                    <div className="balance-value">${account.balance}</div>
                    <div className="balance-currency">{account.currency}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Recent Transactions */}
          <section className="dashboard-card transactions-section">
            <div className="card-header">
              <h3>Recent Transactions</h3>
              <button className="text-button">View All</button>
            </div>
            <div className="transactions-list">
              {recentTransactions.map(transaction => (
                <div className="transaction-item" key={transaction.id}>
                  <div className="transaction-info">
                    <div className="transaction-date">{transaction.date}</div>
                    <div className="transaction-description">{transaction.description}</div>
                    <div className="transaction-category">{transaction.category}</div>
                  </div>
                  <div className={`transaction-amount ${transaction.amount.startsWith('+') ? 'positive' : 'negative'}`}>
                    ${transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Quick Actions */}
          <section className="dashboard-card quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button">
                <span className="action-icon">↗️</span>
                <span>Send Money</span>
              </button>
              <button className="action-button">
                <span className="action-icon">↙️</span>
                <span>Request</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📱</span>
                <span>Mobile Deposit</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📊</span>
                <span>Analytics</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;