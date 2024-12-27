// components/Receipt.tsx
import React from "react";

const Receipt = ({ order }: { order: any }) => {
  return (
    <div id="printable-receipt">
      <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        <h2>Chicken Fried Hub</h2>
        <p>Rissalay wala Road, Gulshan Iqbal, Fawara Chowk, Faisalabad.</p>
        <p>Phone: 0322-6220-365 | 0303-7417-107 | 0337-7014-867</p>
      </div>
      <hr />
      <div>
        <strong>Customer Details:</strong>
        <p>Name: {order.customer_name || "Walking Customer"}</p>
        <p>Address: {order.customer_address || "N/A"}</p>
        <p>Phone: {order.customer_number || "N/A"}</p>
      </div>
      <hr />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.moreFields.map((item: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.quantity * item.rate}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Total</td>
            <td>{order.payment}</td>
          </tr>
        </tfoot>
      </table>
      <hr />
      <p style={{ textAlign: "center" }}>Thank you for your order!</p>
    </div>
  );
};

export default Receipt;
