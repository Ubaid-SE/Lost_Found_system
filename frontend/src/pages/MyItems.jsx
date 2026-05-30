import { useEffect, useState } from "react";
import axios from "axios";

function MyItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/items/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Kya aap sure hain? Item delete ho jayega!");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(item => item._id !== id));
      alert("Item deleted successfully");
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div>
      <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>📁 My Reports</h2>

      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && (
        <p style={{ color: "#94a3b8" }}>Tumne abhi koi item report nahi kiya.</p>
      )}

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

            <span style={{
              display: "inline-block",
              marginTop: "8px",
              background: item.status === "resolved" ? "#dcfce7" : "#fef9c3",
              color: item.status === "resolved" ? "#22c55e" : "#ca8a04",
              padding: "2px 10px",
              borderRadius: "20px",
              fontSize: "12px"
            }}>
              {item.status === "resolved" ? "Resolved ✅" : "Pending ⏳"}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item._id)}
              style={{
                display: "block",
                width: "100%",
                marginTop: "12px",
                padding: "8px",
                background: "#fee2e2",
                color: "#ef4444",
                border: "1px solid #ef4444",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold"
              }}
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyItems;