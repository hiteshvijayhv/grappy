import { useState } from 'react';

export function LinkEditor({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  function add(e) {
    e.preventDefault();
    if (!title || !url) return;
    onAdd({ title, url });
    setTitle('');
    setUrl('');
  }

  return (
    <form className="card" onSubmit={add}>
      <h3>Add Link</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button className="button" type="submit">Add</button>
    </form>
  );
}
