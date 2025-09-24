import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGet } from '../api';

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const p = await apiGet(`/posts/${id}`);
        setPost(p);
      } catch (e) {
        setError('Could not load post');
      }
    })();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <p>Loading...</p>;

  return (
    <article className="card">
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p className="text-muted">by {post.author || 'Anonymous'}</p>
        <p className="card-text" style={{whiteSpace:'pre-wrap'}}>{post.content}</p>
        <Link className="btn btn-outline-primary" to={`/edit/${post._id}`}>Edit</Link>
      </div>
    </article>
  );
}
