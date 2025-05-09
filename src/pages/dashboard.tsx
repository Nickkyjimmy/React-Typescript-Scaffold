import React from "react";
import { useAuth } from "@/hooks/use-auth";

const DashboardPage: React.FC = () => {
  const { isAuthenticated, roles, loading } = useAuth();

  if (loading) return <div>Loading dashboard...</div>;
  if (!isAuthenticated) return <div>Unauthorized</div>;
  console.log("DASHBOARX PAGE", roles)

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Your Dashboard</h1>
      <p>Your roles: {roles}</p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <div style={cardStyle}>
          <h3>Users</h3>
          <p>25</p>
        </div>
        <div style={cardStyle}>
          <h3>Active Sessions</h3>
          <p>12</p>
        </div>
        <div style={cardStyle}>
          <h3>Alerts</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  flex: 1,
  padding: "1rem",
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export default DashboardPage;
