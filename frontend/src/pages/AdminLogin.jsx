import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    console.log("Sending:", formData); // ← debug
    const res = await axios.post("http://localhost:5000/api/auth/login", formData);
    console.log("Response:", res.data); // ← debug

    if (!res.data.user.isAdmin) {
      setError("Admin access required! ❌");
      return;
    }
    localStorage.setItem("adminToken", res.data.token);
    navigate("/admin/dashboard");
  } catch (err) {
    console.log("Error:", err.response?.data); // ← debug
    setError(err.response?.data?.message || "Invalid Credentials ❌");
  }
};

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0f172a" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "12px", width: "340px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
        <h2 style={{ textAlign: "center", color: "#1e293b", marginBottom: "8px" }}>👨‍💼 Admin Panel</h2>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>University Lost & Found</p>

        {error && <p style={{ color: "red", marginBottom: "12px", fontSize: "14px" }}>{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
        />

        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "12px", background: "#1e293b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px" }}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;