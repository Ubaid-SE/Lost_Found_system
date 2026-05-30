import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    lost: 0,
    found: 0,
    myReports: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    // All items
    axios.get("http://localhost:5000/api/items/all")
      .then(res => {
        const all = res.data;
        setStats(prev => ({
          ...prev,
          total: all.length,
          lost: all.filter(i => i.type === "lost").length,
          found: all.filter(i => i.type === "found").length,
        }));
      });

    // My items
    axios.get("http://localhost:5000/api/items/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setStats(prev => ({ ...prev, myReports: res.data.length }));
      });
  }, []);

  const cards = [
    { label: "Total Items", value: stats.total, color: "#3b82f6" },
    { label: "Lost Items", value: stats.lost, color: "#ef4444" },
    { label: "Found Items", value: stats.found, color: "#22c55e" },
    { label: "My Reports", value: stats.myReports, color: "#f59e0b" },
  ];

  return (
    <div>
      <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>Welcome! 👋</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {cards.map(card => (
          <div key={card.label} style={{
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            width: "200px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderTop: `4px solid ${card.color}`
          }}>
            <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{card.label}</p>
            <h2 style={{ color: card.color, margin: "8px 0 0 0", fontSize: "32px" }}>{card.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;