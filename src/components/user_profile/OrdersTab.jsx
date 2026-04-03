export default function OrdersTab() {
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2026-04-01</td>
          <td>$59.99</td>
          <td>Paid</td>
        </tr>
      </tbody>
    </table>
  );
}