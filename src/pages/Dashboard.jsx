import { useEffect, useState } from 'react';
import { api } from '../api';
import { LinkEditor } from '../components/LinkEditor';

export function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [stats, setStats] = useState([]);

  async function load() {
    const me = await api.get('/profiles/me');
    setProfile(me.data.profile);
    setLinks(me.data.links);
    const analytics = await api.get('/analytics/me');
    setStats(analytics.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function addLink(payload) {
    await api.post('/links', payload);
    load();
  }

  async function removeLink(id) {
    await api.delete(`/links/${id}`);
    load();
  }

  if (!profile) return <div className="container">Loading...</div>;

  return (
    <div className="container dashboard">
      <section className="card">
        <h2>{profile.displayName}</h2>
        <p>@{profile.username}</p>
        <p>{profile.bio}</p>
        <a className="button ghost" href={`/${profile.username}`}>View Public Page</a>
      </section>
      <LinkEditor onAdd={addLink} />
      <section className="card">
        <h3>Links</h3>
        {links.map((link) => (
          <div className="listRow" key={link._id}>
            <span>{link.title}</span>
            <button className="button danger" onClick={() => removeLink(link._id)}>Delete</button>
          </div>
        ))}
      </section>
      <section className="card">
        <h3>Analytics (daily aggregates)</h3>
        {stats.length === 0 && <p>No analytics yet.</p>}
        {stats.map((s) => (
          <div className="listRow" key={s._id}>
            <span>{s.date}</span>
            <span>Views: {s.views}</span>
            <span>Clicks: {s.clicks}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
