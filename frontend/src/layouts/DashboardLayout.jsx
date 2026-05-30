import { Link, useNavigate, useLocation } from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

const navLinks = [
  { path: "/dashboard", label: "🏠 Home" },
  { path: "/report-lost", label: "🔴 Report Lost" },
  { path: "/report-found", label: "🟢 Report Found" },
  { path: "/all-items", label: "📋 All Items" },
  { path: "/my-items", label: "📁 My Reports" },
];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
        position: "fixed",
        height: "100vh"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "18px", color: "#38bdf8" }}>
          🎓 Lost & Found
        </h2>

        <nav style={{ flex: 1 }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "block",
                padding: "12px 24px",
                color: location.pathname === link.path ? "#38bdf8" : "#cbd5e1",
                textDecoration: "none",
                background: location.pathname === link.path ? "#0f172a" : "transparent",
                borderLeft: location.pathname === link.path ? "4px solid #38bdf8" : "4px solid transparent",
                marginBottom: "4px",
                fontSize: "14px"
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            margin: "20px",
            padding: "10px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: "240px",
        flex: 1,
        background: "#f1f5f9",
        minHeight: "100vh"
      }}>
        {/* Top Navbar */}
        <div style={{
          background: "white",
          padding: "16px 30px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{ margin: 0, color: "#1e293b" }}>Dashboard</h3>
          <span style={{ color: "#64748b", fontSize: "14px" }}>University Lost & Found System</span>
        </div>

        {/* Page Content */}
        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>

    </div>
  );
}

export default DashboardLayout;