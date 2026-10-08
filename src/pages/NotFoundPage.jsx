import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="status">
      <p className="big-emoji">❓</p>
      <p>There's nothing here — a wild 404 appeared!</p>
      <Link to="/" className="back-link">← Back to list</Link>
    </div>
  );
}

export default NotFoundPage;
