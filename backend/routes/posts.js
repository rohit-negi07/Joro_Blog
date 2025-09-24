import { Router } from 'express';
import Post from '../models/Post.js';

const router = Router();

// Create
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Read all (with simple search)
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { title: new RegExp(q, 'i') } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
