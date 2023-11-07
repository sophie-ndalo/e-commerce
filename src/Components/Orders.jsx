import React, { Component } from 'react';

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [], // Initialize the orders state as an empty array
    };
  }

  componentDidMount() {
    // You should replace this with actual data fetching logic from your backend
    // For demonstration purposes, we'll populate some sample orders here.
    const sampleOrders = [
      { id: 1, date: '2023-11-01', total: 50.0, products: ['Product A', 'Product B'] },
      { id: 2, date: '2023-11-05', total: 30.0, products: ['Product C', 'Product D'] },
      // Add more orders as needed
    ];

    this.setState({ orders: sampleOrders });
  }

  render() {
    const { orders } = this.state;

    return (
      <div>
        <h2>Previous Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.products.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orders;
