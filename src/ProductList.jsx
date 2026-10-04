import React from 'react';

export default function ProductList({ products, onEdit, onDelete, busy }) {
  return (
    <div className="panel table-wrap">
      <h2>Product List</h2>
      {products.length === 0 ? <p>No products yet.</p> : (
        <table>
          <thead><tr><th>ID</th><th>Product</th><th>Description</th><th>Price</th><th>Quantity</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.product_name}</td>
                <td>{product.description}</td>
                <td>₱{Number(product.price).toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td><div className="actions">
                  <button className="secondary" onClick={() => onEdit(product)} disabled={busy}>Edit</button>
                  <button className="danger" onClick={() => onDelete(product)} disabled={busy}>Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
