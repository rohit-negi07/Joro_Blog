import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiSend } from '../api';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const p = await apiGet(`/posts/${id}`);
        setTitle(p.title); setContent(p.content); setAuthor(p.author || '');
      } catch (e) {
        setError('Could not load post');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await apiSend(`/posts/${id}`, 'PUT', { title, content, author });
      navigate('/');
    } catch (e) {
      setError('Failed to update');
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this post?')) return;
    try {
      await apiSend(`/posts/${id}`, 'DELETE');
      navigate('/');
    } catch (e) {
      setError('Failed to delete');
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-3">Edit Post</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="vstack gap-3">
          <input className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input className="form-control" placeholder="Author (optional)" value={author} onChange={e => setAuthor(e.target.value)} />
          <textarea className="form-control" rows="6" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">Update</button>
            <button type="button" className="btn btn-outline-danger ms-auto" onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}
