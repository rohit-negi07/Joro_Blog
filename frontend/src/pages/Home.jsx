import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      const data = await apiGet(`/posts${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      setPosts(data);
    } catch (e) {
      setError('Could not load posts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="home-header text-center">
  <h2 className="mb-1">Welcome to Joro Blog</h2>
        <p className="mb-0">A simple, colorful CRUD blog built with MongoDB, Express, React, and Node.js</p>
      </div>
      <div className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Search by title..." value={q} onChange={e => setQ(e.target.value)} />
        <button className="btn btn-primary" onClick={load}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="vstack gap-3">
        {posts.map(p => (
          <div className="card card-hover" key={p._id}>
            <div className="card-body">
              <h5 className="card-title">{p.title}</h5>
              <p className="card-text text-secondary">{p.content.slice(0, 140)}{p.content.length > 140 ? '…' : ''}</p>
              <div className="d-flex justify-content-between">
                <small className="text-muted">by {p.author || 'Anonymous'}</small>
                <div className="d-flex gap-2">
                  <Link className="btn btn-sm btn-outline-secondary" to={`/view/${p._id}`}>View</Link>
                  <Link className="btn btn-sm btn-outline-primary" to={`/edit/${p._id}`}>Edit</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!loading && posts.length === 0 && <p className="text-center text-muted">No posts yet. Try creating one!</p>}
      </div>
    </div>
  );
}
