import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("items");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/items", { headers }),
        axios.get("http://localhost:5000/api/admin/users", { headers })
      ]);
      setItems(itemsRes.data);
      setUsers(usersRes.data);
      setLoading(false);
    } catch {
      navigate("/admin/login");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/items/${id}/status`,
        { status },
        { headers }
      );
      setItems(items.map(item => item._id === id ? { ...item, status } : item));
    } catch {
      alert("Status update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete karna chahte hain?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/items/${id}`, { headers });
      setItems(items.filter(item => item._id !== id));
    } catch {
      alert("Delete failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* Sidebar */}
      <div style={{ width: "220px", background: "#0f172a", color: "white", padding: "20px 0", position: "fixed", height: "100vh", display: "flex", flexDirection: "column" }}>
        <h2 style={{ textAlign: "center", color: "#38bdf8", fontSize: "16px", marginBottom: "30px" }}>👨‍💼 Admin Panel</h2>

        {[
          { key: "items", label: "📋 All Items" },
          { key: "users", label: "👥 All Users" },
          { key: "stats", label: "📊 Stats" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            display: "block",
            width: "100%",
            padding: "12px 24px",
            background: tab === t.key ? "#1e293b" : "transparent",
            color: tab === t.key ? "#38bdf8" : "#cbd5e1",
            border: "none",
            borderLeft: tab === t.key ? "4px solid #38bdf8" : "4px solid transparent",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "4px"
          }}>
            {t.label}
          </button>
        ))}

        <button onClick={handleLogout} style={{
          margin: "auto 20px 20px",
          padding: "10px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "220px", flex: 1, background: "#f1f5f9", minHeight: "100vh" }}>

        {/* Top Bar */}
        <div style={{ background: "white", padding: "16px 30px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, color: "#1e293b" }}>
            {tab === "items" ? "📋 All Items" : tab === "users" ? "👥 All Users" : "📊 Stats"}
          </h3>
          <span style={{ color: "#64748b", fontSize: "13px" }}>University Lost & Found — Admin</span>
        </div>

        <div style={{ padding: "30px" }}>
          {loading && <p>Loading...</p>}

          {/* Items Tab */}
          {!loading && tab === "items" && (
            <div>
              <p style={{ color: "#64748b", marginBottom: "16px" }}>{items.length} total items</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {items.map(item => (
                  <div key={item._id} style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    width: "260px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    borderTop: `4px solid ${item.type === "lost" ? "#ef4444" : "#22c55e"}`
                  }}>
                    <span style={{
                      background: item.type === "lost" ? "#fee2e2" : "#dcfce7",
                      color: item.type === "lost" ? "#ef4444" : "#22c55e",
                      padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold"
                    }}>
                      {item.type === "lost" ? "LOST" : "FOUND"}
                    </span>

                    <h3 style={{ margin: "10px 0 6px", color: "#1e293b" }}>{item.title}</h3>
                    <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 4px" }}>{item.description}</p>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "2px 0" }}>📍 {item.location}</p>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "2px 0" }}>🗂 {item.category}</p>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: "2px 0" }}>👤 {item.reportedBy?.name}</p>

                    {/* Status Change */}
                    <select
                      value={item.status}
                      onChange={e => handleStatusChange(item._id, e.target.value)}
                      style={{
                        width: "100%", marginTop: "10px", padding: "6px",
                        borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px"
                      }}
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="resolved">✅ Resolved</option>
                    </select>

                    <button
                      onClick={() => handleDelete(item._id)}
                      style={{
                        width: "100%", marginTop: "8px", padding: "8px",
                        background: "#fee2e2", color: "#ef4444",
                        border: "1px solid #ef4444", borderRadius: "8px",
                        cursor: "pointer", fontSize: "13px"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {!loading && tab === "users" && (
            <div>
              <p style={{ color: "#64748b", marginBottom: "16px" }}>{users.length} total users</p>
              <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Name", "Email", "Role", "Joined"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#64748b", fontSize: "13px", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>{user.name}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "#64748b" }}>{user.email}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{
                            background: user.isAdmin ? "#dbeafe" : "#f1f5f9",
                            color: user.isAdmin ? "#3b82f6" : "#64748b",
                            padding: "2px 10px", borderRadius: "20px", fontSize: "12px"
                          }}>
                            {user.isAdmin ? "Admin" : "User"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#94a3b8" }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {!loading && tab === "stats" && (
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {[
                { label: "Total Items", value: items.length, color: "#3b82f6" },
                { label: "Lost Items", value: items.filter(i => i.type === "lost").length, color: "#ef4444" },
                { label: "Found Items", value: items.filter(i => i.type === "found").length, color: "#22c55e" },
                { label: "Resolved", value: items.filter(i => i.status === "resolved").length, color: "#8b5cf6" },
                { label: "Pending", value: items.filter(i => i.status === "pending").length, color: "#f59e0b" },
                { label: "Total Users", value: users.length, color: "#0ea5e9" },
              ].map(card => (
                <div key={card.label} style={{
                  background: "white", borderRadius: "12px", padding: "24px",
                  width: "180px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  borderTop: `4px solid ${card.color}`
                }}>
                  <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{card.label}</p>
                  <h2 style={{ color: card.color, margin: "8px 0 0 0", fontSize: "32px" }}>{card.value}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;