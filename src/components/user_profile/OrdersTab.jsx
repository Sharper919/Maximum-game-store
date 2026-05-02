import { useEffect, useState } from 'react';
import { apiFetch } from '../../api/client';

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await apiFetch('/api/orders/my');
        setOrders(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (isLoading) {
    return <div className="profile-message">Loading orders...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="profile-message">You have no orders yet.</div>;
  }

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
        {orders.map((order, index) => (
          <tr key={`${order.date}-${index}`}>
            <td>{formatDate(order.date)}</td>
            <td>UAH {order.price}</td>
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
