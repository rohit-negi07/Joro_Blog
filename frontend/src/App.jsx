import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx';
import ViewPost from './pages/ViewPost.jsx';

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container container-narrow py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/view/:id" element={<ViewPost />} />
        </Routes>
      </main>
    </>
  );
}
