import { useEffect, useState } from "react";
import axios from "axios";

function AllItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/items/all")
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || item.type === filterType;
    const matchCategory = filterCategory === "all" || item.category === filterCategory;
    return matchSearch && matchType && matchCategory;
  });

  return (
    <div>
      <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>📋 All Items</h2>

      {/* Search & Filter Bar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          placeholder="🔍 Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "14px",
            width: "240px"
          }}
        />

        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "14px",
            background: "white"
          }}
        >
          <option value="all">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "14px",
            background: "white"
          }}
        >
          <option value="all">All Categories</option>
          <option value="Books">Books</option>
          <option value="ID Card">ID Card</option>
          <option value="Electronics">Electronics</option>
          <option value="Bag">Bag</option>
          <option value="Keys">Keys</option>
          <option value="Wallet">Wallet</option>
          <option value="Other">Other</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={() => { setSearch(""); setFilterType("all"); setFilterCategory("all"); }}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            background: "white",
            cursor: "pointer",
            fontSize: "14px",
            color: "#64748b"
          }}
        >
          ✖ Reset
        </button>
      </div>

      {/* Results Count */}
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
        {filtered.length} item(s) found
      </p>

      {loading && <p>Loading...</p>}
      {!loading && filtered.length === 0 && (
        <p style={{ color: "#94a3b8" }}>Koi item nahi mila.</p>
      )}

      {/* Items Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filtered.map(item => (
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
              padding: "2px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold"
            }}>
              {item.type === "lost" ? "LOST" : "FOUND"}
            </span>

            <h3 style={{ margin: "10px 0 6px", color: "#1e293b" }}>{item.title}</h3>
            <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 6px" }}>{item.description}</p>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>📍 {item.location}</p>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: "4px 0 0" }}>🗂 {item.category}</p>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: "4px 0 0" }}>
              👤 {item.reportedBy?.name || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllItems;