import { useState } from "react";
import axios from "axios";

function ReportItem({ type }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/items/report",
        { ...formData, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(`${type === "lost" ? "Lost" : "Found"} item reported successfully! ✅`);
      setError("");
      setFormData({ title: "", description: "", category: "", location: "" });
    } catch (err) {
      setError("Error reporting item ❌");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>
        {type === "lost" ? "🔴 Report Lost Item" : "🟢 Report Found Item"}
      </h2>

      <div style={{ background: "white", padding: "30px", borderRadius: "12px", maxWidth: "500px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>

        {success && <p style={{ color: "green", marginBottom: "12px" }}>{success}</p>}
        {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}

        <input
          name="title"
          placeholder="Item Title (e.g. Blue Bag)"
          value={formData.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description..."
          value={formData.description}
          onChange={handleChange}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">-- Select Category --</option>
          <option value="Books">Books</option>
          <option value="ID Card">ID Card</option>
          <option value="Electronics">Electronics</option>
          <option value="Bag">Bag</option>
          <option value="Keys">Keys</option>
          <option value="Wallet">Wallet</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="location"
          placeholder="Location (e.g. Library, Block C)"
          value={formData.location}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={{
          width: "100%",
          padding: "12px",
          background: type === "lost" ? "#ef4444" : "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          cursor: "pointer"
        }}>
          {type === "lost" ? "Report Lost" : "Report Found"}
        </button>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  boxSizing: "border-box"
};

export default ReportItem;