import React, { useEffect, useState } from 'react';
import { request } from './api.js';
import Login from './Login.jsx';
import ProductForm from './ProductForm.jsx';
import ProductList from './ProductList.jsx';

export default function App() {
  const [auth, setAuth] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('lab6-auth')); }
    catch { return null; }
  });
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [deleting, setDeleting] = useState(null);

  function clearAuth() {
    sessionStorage.removeItem('lab6-auth');
    setAuth(null);
    setProducts([]);
    setForm(null);
    setDeleting(null);
  }

  function failed(error) {
    setError(error.message);
    if (error.status === 401) clearAuth();
  }

  useEffect(() => {
    if (!auth) return;
    let active = true;
    setLoading(true);
    request('/products', 'GET', undefined, auth.token)
      .then(data => { if (active) setProducts(data.products); })
      .catch(error => { if (active) failed(error); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [auth]);

  async function login(credentials) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const data = await request('/login', 'POST', credentials);
      const session = { token: data.token, username: data.user.username };
      sessionStorage.setItem('lab6-auth', JSON.stringify(session));
      setAuth(session);
    } catch (error) { failed(error); }
    finally { setBusy(false); }
  }

  async function save(data) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await request(form.id ? `/products/${form.id}` : '/products', form.id ? 'PUT' : 'POST', data, auth.token);
      setProducts(current => form.id ? current.map(p => p.id === result.product.id ? result.product : p) : [...current, result.product]);
      setForm(null);
      setNotice(result.message);
    } catch (error) { failed(error); }
    finally { setBusy(false); }
  }

  async function remove() {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await request(`/products/${deleting.id}`, 'DELETE', undefined, auth.token);
      setProducts(current => current.filter(p => p.id !== deleting.id));
      setDeleting(null);
      setNotice(result.message);
    } catch (error) { failed(error); }
    finally { setBusy(false); }
  }

  async function logout() {
    setBusy(true);
    setError('');
    try {
      await request('/logout', 'POST', undefined, auth.token);
      clearAuth();
      setNotice('Logged out successfully.');
    } catch (error) { failed(error); }
    finally { setBusy(false); }
  }

  return (
    <main>
      <header>
        <div><h1>Product Management</h1><p>Jhon Joseph Evora · BSIT 3-F2 · Lab 6</p></div>
        {auth && <div className="actions"><span>{auth.username}</span><button className="secondary" onClick={logout} disabled={busy || loading}>Logout</button></div>}
      </header>
      {error && <p className="error" role="alert">{error}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}
      {!auth ? <Login onLogin={login} busy={busy} /> : loading ? <p>Loading products...</p> : (
        <>
          {form ? <ProductForm key={form.id || 'new'} product={form.id ? form : null} onSave={save} onCancel={() => setForm(null)} busy={busy} /> : (
            <>
              <button onClick={() => { setForm({}); setNotice(''); setError(''); }} disabled={busy}>Add Product</button>
              {deleting && <section className="panel" role="dialog" aria-modal="false" aria-labelledby="delete-title">
                <h2 id="delete-title">Delete Product</h2>
                <p>Delete {deleting.product_name}?</p>
                <div className="actions"><button className="danger" onClick={remove} disabled={busy}>Confirm Delete</button><button className="secondary" onClick={() => setDeleting(null)} disabled={busy}>Cancel</button></div>
              </section>}
              <ProductList products={products} onEdit={p => { setForm(p); setNotice(''); setError(''); }} onDelete={p => { setDeleting(p); setNotice(''); setError(''); }} busy={busy || !!deleting} />
            </>
          )}
        </>
      )}
    </main>
  );
}
