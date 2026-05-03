export default function DashboardTab({ users, games, orders }) {
  const revenue = orders.reduce((sum, order) => sum + Number(order.price || 0), 0);

  return (
    <div className="dashboard">
      <div className="stat-card">Users: {users.length}</div>
      <div className="stat-card">Orders: {orders.length}</div>
      <div className="stat-card">Games: {games.length}</div>
      <div className="stat-card">Revenue: UAH {revenue.toFixed(2)}</div>
    </div>
  );
}
