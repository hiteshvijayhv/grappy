import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

export function PublicProfile() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/profiles/${username}`).then((res) => setData(res.data));
  }, [username]);

  if (!data) return <div className="container">Loading...</div>;
  const { profile, links } = data;

  async function handleClick(link) {
    await api.post(`/analytics/click/${link._id}`);
    window.open(link.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="publicPage" style={{ background: profile.theme.background, color: profile.theme.foreground }}>
      <div className="publicCard">
        <h1>{profile.displayName}</h1>
        <p>@{profile.username}</p>
        <p>{profile.bio}</p>
        {links.map((link) => (
          <button
            key={link._id}
            className="linkButton"
            style={{ background: profile.theme.accent }}
            onClick={() => handleClick(link)}
          >
            {link.title}
          </button>
        ))}
      </div>
    </div>
  );
}
