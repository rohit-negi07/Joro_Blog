import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiSend } from '../api';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      await apiSend('/posts', 'POST', { title, content, author });
      navigate('/');
    } catch (e) {
      setError('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-3">Create Post</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="vstack gap-3">
          <input className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input className="form-control" placeholder="Author (optional)" value={author} onChange={e => setAuthor(e.target.value)} />
          <textarea className="form-control" rows="6" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  );
}
