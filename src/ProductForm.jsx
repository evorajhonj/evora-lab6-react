import React, { useState } from 'react';

export default function ProductForm({ product, onSave, onCancel, busy }) {
  const [form, setForm] = useState(product || { product_name: '', description: '', price: '', quantity: '' });

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    onSave({ product_name: form.product_name, description: form.description, price: form.price, quantity: form.quantity });
  }

  return (
    <form className="panel" onSubmit={submit}>
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <label>Product name
        <input name="product_name" maxLength="100" value={form.product_name} onChange={change} required />
      </label>
      <label>Description
        <textarea name="description" value={form.description} onChange={change} required />
      </label>
      <div className="fields">
        <label>Price
          <input name="price" type="number" min="0" max="99999999.99" step="0.01" value={form.price} onChange={change} required />
        </label>
        <label>Quantity
          <input name="quantity" type="number" min="0" max="2147483647" step="1" value={form.quantity} onChange={change} required />
        </label>
      </div>
      <div className="actions">
        <button disabled={busy}>{busy ? 'Saving...' : 'Save Product'}</button>
        <button type="button" className="secondary" onClick={onCancel} disabled={busy}>Cancel</button>
      </div>
    </form>
  );
}
