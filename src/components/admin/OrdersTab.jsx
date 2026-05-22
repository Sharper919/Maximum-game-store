export default function OrdersTab({ orders }) {
  if (orders.length === 0) {
    return <div className="admin-message">No orders found.</div>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Total</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.orderId}>
            <td>{order.orderId}</td>
            <td>{order.userName}</td>
            <td>UAH {order.price}</td>
            <td>{formatDate(order.date)}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function formatDate(date) {
  return date ? new Date(date).toLocaleDateString() : '-';
}
