import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="container hero">
      <div>
        <h1>Grappy</h1>
        <p>Build your creator profile, share every link, and scale analytics with Kafka.</p>
        <div className="row">
          <Link className="button" to="/register">Get Started</Link>
          <Link className="button ghost" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
