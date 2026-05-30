import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import AllItems from "./pages/AllItems";
import MyItems from "./pages/MyItems";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/report-lost" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ReportLost />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/report-found" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ReportFound />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/all-items" element={
          <ProtectedRoute>
            <DashboardLayout>
              <AllItems />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/my-items" element={
          <ProtectedRoute>
            <DashboardLayout>
              <MyItems />
            </DashboardLayout>
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;