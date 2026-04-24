export default function OrdersTab() {
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
        <tr>
          <td>#123</td>
          <td>Max</td>
          <td>$50</td>
          <td>2023-01-01</td>
          <td>Paid</td>
        </tr>
      </tbody>
    </table>
  );
}